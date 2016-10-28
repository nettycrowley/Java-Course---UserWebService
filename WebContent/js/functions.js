//when the the page is rendered ot calls this function, 
//you wait till everything is loaded to run the java script
//$(document).ready(init);

var users;

$(document).ready(function() {

			var data = {};
			$.getJSON("apiGetUsers.jsp", data, function(data, status, xhr) {

				users = data;
				for (i = 0; i < data.length; i++) {

					$("#userList").append(
							"<option value='" + data[i].id + "'>"
									+ data[i].firstName + " "
									+ data[i].lastName + "</option>");

				}
			});

			$('#clearButton').on("click", function() {
				$('#userList').empty();
			});

			$("#deleteButton").on(
					"click",
					function() {

						if (confirm("Are you sure")) {
							var id = $("#userList").val();
							var data = {
								"id" : id
							};
							$.getJSON("apiDeleteUser.jsp", data, function(data,
									status, xhr) {

								// remove the user from the array
								for (var i = users.length - 1; i >= 0; i--) {
									if (users[i].id == id) {
										users.splice(i, 1);
									}
								}
								// repopulate the list box
								$("#userList").empty();
								for (i = 0; i < users.length; i++) {

									$("#userList").append(
											"<option value='" + users[i].id
													+ "'>" + users[i].firstName
													+ " " + users[i].lastName
													+ "</option>");

								}
							});
						}

					});

			$("#addButton").on("click", function() {

				var firstName = $("#firstName").val();
				var lastName = $("#lastName").val();
				var registered = $("#registered").prop("checked") == null;
				var dateOfBirth = $("#dateOfBirth").val();

				// validate my inputs

				// set the parameters
				var data = {
					"firstName" : firstName,
					"lastName" : lastName,
					"registered" : registered ? 1 : 0,
					"dateOfBirth" : dateOfBirth
				};
				// call the api
				$.getJSON("apiAddUser.jsp", data, function(data, status, xhr) {
					alert("added");
					// add user to array and the list
					var user = {
						"id" : data.id,
						"firstName" : firstName,
						"lastName" : lastName,
						"registered" : registered ? 1 : 0,
						"dateOfBirth" : dateOfBirth
					};
					users.push(user);
					populateList();

					// clear the input controls??
				});
			});

			$("#userList").on("change", function() {
				var id = $("#userList").val();
				var user;

				// find the user with id in users
				for (var i = 0; i < users.length; i++) {
					if (users[i].id == id) {
						user = users[i];
						break;
					}
				}
				$("#id").val(user.id);
				$("#firstName").val(user.firstName);
				$("#lastName").val(user.lastName);
				$("#registered").prop("checked", user.registered);
				$("#dateOfBirth").val(user.dateOfBirth);

			});

			$("#updateButton").on("click", function() {
								var id = $("#id").val();
								var firstName = $("#firstName").val();
								var lastName = $("#lastName").val();
								var registered = $("#registered").prop(
										"checked") == null;
								var dateOfBirth = $("#dateOfBirth").val();

								// validate my inputs

								// set the parameters
								var data = {
									"id" : id,
									"firstName" : firstName,
									"lastName" : lastName,
									"registered" : registered ? 1 : 0,
									"dateOfBirth" : dateOfBirth
								};
								// call the api
								$.getJSON("apiUpdateUser.jsp", data, function(
										data, status, xhr) {
									alert("updated");
									// add user to array and the list
									var user = {
										"id" : data.id,
										"firstName" : firstName,
										"lastName" : lastName,
										"registered" : registered ? 1 : 0,
										"dateOfBirth" : dateOfBirth
									};

									// find user with user.id = id
									for (var i = 0; i < users.length; i++) {
										if (users[i].id == id) {
											// replace user[i] with the updated
											// user
											users.splice(i, 1, user);
											break;
										}
									}
									populateList();

									// clear the input controls??
								});

							});
		});

function populateList() {
	$("#userList").empty();
	for (i = 0; i < users.length; i++) {

		$("#userList").append(
				"<option value='" + users[i].id + "'>" + users[i].firstName
						+ " " + users[i].lastName + "</option>");
	}
}

/*
 * function init() {
 * 
 * alert("init called"); $("#pageTitle").html("UserWebService");
 * 
 * $(".red").html("These are red divs");
 * 
 * $(".div").addClass("border2");
 * 
 * //populate the form $("#id").val(-1); $("#firstName").val("Aidan");
 * $("#lastName").val("Kileen"); $("#registered").prop('checked', true);
 * $("#dateOfBirth").val("1985-01-05");
 * 
 * //add an event handler to a dom element $("#id").on("click", function(){
 * alert("you clicked the id"); });
 * 
 * $("div").on("click", function(){ alert("you clicked on div"); });
 * 
 * $("#pageTitle").on("click", function(){ alert("you clicked on title"); });
 * 
 * var data={};
 * 
 * $.getJSON("apiGetUsers.jsp", data, function(data, status, xhr){
 * 
 * var userList = document.getElementById("userList");
 * 
 * for (i=0; i<data.length; i++){
 * 
 * $("#userList").append("<option value='" + data[i].id + "'>" +
 * data[i].firstName + " " + data[i].lastName + "</option>");
 *  } });
 * 
 * $('#clearButton').on("click", function(){ $('userList').empty(); });
 * 
 * var xhr = new XMLHttpRequest();
 * 
 * xhr.onreadystatechange = function() { if (this.readyState == 4 && this.status ==
 * 200) {
 * 
 * var users = JSON.parse(this.responseText);
 * 
 * var userList = document.getElementById("userList");
 * 
 * for (i=0; i<users.length; i++){
 * 
 * var option = document.createElement("option"); option.text =
 * users[i].firstName + " " + users[i].lastName; option.value = users[i].id;
 * userList.add(option); } } };
 * 
 * xhr.open("GET", "apiGetUsers.jsp", true);
 * 
 * xhr.send();
 *  }
 */