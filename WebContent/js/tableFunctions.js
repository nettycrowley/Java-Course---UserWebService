var users;
$(document).ready(function(){
	var data = {};
	$.getJSON("apiGetUsers.jsp", data, function(data, status, xhr) {

		users = data;
		populateTable();
	});
		
		//now that the button exist - attach event handler
		$(document).on("click", ".deleteButton", function(event){
			alert("Clicked delete");
			
			var id = event.target.id.split("_")[1];
			
			$("#dialogDiv").dialog({
				modal:true,
				buttons: {
					Ok: function() {
						$(this).dialog("close");
						var data = {"id":id};
						$.getJSON("apiDeleteUser.jsp", data, function(data, status, xhr){
							$("#tr_" + id).remove();
						});
						
					},
					Cancel: function(){
						$(this).dialog("close");
					}
				}
				});
			});
		
		$("#dlgDateOfBirth").datepicker({ dateFormat: 'yy-mm-dd',
											changeYear:true,
											changeMonth:true,
											yearRange: "-120:+0"
												});
		
		$(document).on("click", "#addButton", function(event){
					
			$("#dialogAdd").dialog({
				
				modal: true,
				buttons : {
					Ok : function() {
						//read the values
						var firstName = $("#dlgFirstName").val();
						var lastName = $("#dlgLastName").val();
						var registered = $("#dlgRegistered").prop("checked");
						var dateOfBirth = $("#dlgDateOfBirth").val();
						
						data = {
								"firstName":firstName,
								"lastName":lastName,
								"registered":registered,
								"dateOfBirth":dateOfBirth
						}
						
						//validate them!!
						
						//call the api to add
						$.getJSON("apiAddUser.jsp", data, function(data, status, xhr){
							alert("added" + data.id);
							
							var user = {"id":data.id, 
									"firstName": firstName,
									"lastName" : lastName,
									"registered" : registered ? 1 : 0,
									"dateOfBirth" : dateOfBirth};
							
							users.push(user);
							populateTable();
							$("#dialogAdd").dialog("close");
							$("#addErrorMessage").text(" ");
						}).fail(function(xhr, status, error){
							
							$("#addErrorMessage").text("Invalid Date");
							$('#dateOfBirth').focus();
						});
						
						
					},
					Cancel : function() {
						$(this).dialog("close");
					}
				}
			});
		});
			
			
			
			
		
		
	$(document).on("click", ".editButton", function(event){
		var id = event.target.id.split("_")[1];
		startEdit(id);
	});
	
	$(document).on("click", ".saveButton", function(event){
		var id = event.target.id.split("_")[1];
		saveEdit(id);
	});
	
	$(document).on("click", ".undoButton", function(event){
		var id = event.target.id.split("_")[1];
		undoEdit(id);
	});
	
});

function startEdit(id){
	
	var tdFirstName = $("#tr_" + id + " :nth-child(2)");
	var value = tdFirstName.html();
	tdFirstName.html("<input type='text' " 
					+ "value='" + value + "'" 
					+ " id ='firstName_" + id + "'>");
	
	var tdLastName = $("#tr_" + id + " :nth-child(3)");
	var value = tdLastName.html();
	tdLastName.html("<input type='text' " 
					+ "value='" + value + "'" 
					+ " id ='lastName_" + id + "'>");
	
	var tdRegistered = $("#tr_" + id + " :nth-child(4)");
	var value = tdRegistered.html() == "true";
	tdRegistered.html("<input type='checkbox' "
					+ "id='registered_" + id + "'"
					+ (value ? "checked" : "") + ">");
	
	var tdDateOfBirth = $("#tr_" + id + " :nth-child(5)");
	var value = tdDateOfBirth.html();
	tdDateOfBirth.html("<input type='text' " 
					+ "value='" + value + "'" 
					+ " id ='dateOfBirth_" + id + "'>");
}

function undoEdit(id){
	
	//find the user where user[i]=id	
	for (var i=0; i<users.length; i++) {
		if (users[i].id == id){
			user = users[i];
		}
	}
	
	//delete controls
	//put back in the values
	var tdFirstName = $("#tr_" + id + " :nth-child(2)");
	tdFirstName.html(user.firstName);
	
	$("#tr_" + id + " :nth-child(3)").html(user.lastName);
	$("#tr_" + id + " :nth-child(4)").html(user.registered?"true" : "false");
	$("#tr_" + id + " :nth-child(5)").html(user.dateOfBirth);
}

function saveEdit(id){
	//read new values
	var firstName = $("#firstName_" + id).val();
	var lastName = $("#lastName_" + id).val();
	var registered = $("#registered_" + id).prop("checked");
	var dateOfBirth = $("#dateOfBirth_" + id).val();
	
	
	//validate the new values !!!!
	//TBD
	
	//call the api to write the new values
	var data = {"id":id,
			"firstName": firstName,
			"lastName" : lastName,
			"registered" : registered ? 1 : 0,
			"dateOfBirth" : dateOfBirth};
	
	$.getJSON("apiUpdateUser.jsp", data, function(data, status, xhr){
		alert("saved");
		
	});
	
	
	//remove controls and put in the new values in the tds
	$("#tr_" + id + " :nth-child(2)").html(firstName);
	$("#tr_" + id + " :nth-child(3)").html(lastName);
	$("#tr_" + id + " :nth-child(4)").html(registered?"true" : "false");
	$("#tr_" + id + " :nth-child(5)").html(dateOfBirth);
	
	
}

function populateTable(){
	$("#userTable tbody tr").remove();

	for (i = 0; i < users.length; i++) {
	
		$("#userTable").append("<tr id ='tr_" + users[i].id + "'></tr>");
		
		var tr = $("#tr_" + users[i].id);
		tr.append("<td>" + users[i].id + "</td>");
		tr.append("<td>" + users[i].firstName + "</td>");
		tr.append("<td>" + users[i].lastName + "</td>");
		tr.append("<td>" + users[i].registered + "</td>");
		tr.append("<td>" + users[i].dateOfBirth + "</td>");
		
		tr.append("<td class='td_small centered deleteButton tdButton fa fa-close'" + "id='deleteButton_" + users[i].id + "'></td>");
		tr.append("<td class='td_small centered editButton tdButton fa fa-edit'" + "id='editButton_" + users[i].id + "'></td>");
		tr.append("<td class='td_small centered saveButton tdButton fa fa-save'" + "id='saveButton_" + users[i].id + "'></td>");
		tr.append("<td class='td_small centered undoButton tdButton fa fa-undo'" + "id='undoButton_" + users[i].id + "'></td>");
	}
}