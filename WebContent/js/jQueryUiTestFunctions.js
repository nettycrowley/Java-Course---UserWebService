$(document).ready(function(){
	
	$("#dateOfBirth").datepicker({ dateFormat: 'yy-mm-dd'});

	$("#main").on("click", function(event){
		
		$("#dialogAdd").dialog({
			
			modal: true,
			buttons : {
				Ok : function() {
					//read the values
					var firstName = $("#firstName").val();
					var lastName = $("#lastName").val();
					var registered = $("#registered").prop("checked");
					var dateOfBirth = $("#dateOfBirth").val();
					
					data = {
							"firstName":firstName,
							"lastName":lastName,
							"registered":registered,
							"dateOfBirth":dateOfBirth
					}
					
					//validate them!!
					
					//call the api to add
					$.getJSON("apiAddUser.jsp", data, function(){
						alert("added");
					});
					
					$(this).dialog("close");
				},
				/*Cancel : function() {
					$(this).dialog("close");
				}*/
			}
		});
	});
});



//show a jqueryui dialog
/*		$("#dialogDiv").dialog({

width: 300,
height: 150,
modal : true,
buttons : {
	Ok : function() {
		$(this).dialog("close");
	},
	Cancel : function() {
		$(this).dialog("close");
	}
}
});*/
