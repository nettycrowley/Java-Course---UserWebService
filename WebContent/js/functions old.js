function init() {
	$("#pageTitle").html("UserWebService");
	
	$(".red").html("These are red divs");
	
	$(".div").addClass("border2");
	
	//populate the form
	$("#id").val(-1);
	$("#firstName").val("Aidan");
	$("#lastName").val("Kileen");
	$("#registered").prop('checked', true);
	$("#dateOfBirth").val("1985-01-05");	
	
	//add an event handler to a dom element
	$("#id").on("click", function(){
		alert("you clicked the id");
	});
	
	$("div").on("click", function(){
		alert("you clicked on div");
	});
	
	$("#pageTitle").on("click", function(){
		alert("you clicked on title");
	});
	
	
	var xhr = new XMLHttpRequest();
	
	xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            var users = JSON.parse(this.responseText);
            
            var userList = document.getElementById("userList");
            
            for (i=0; i<users.length; i++){
            	
            	var option = document.createElement("option");
            	option.text = users[i].firstName + " " + users[i].lastName;
            	option.value = users[i].id;
            	userList.add(option);
            }
        }
    };
	
	xhr.open("GET", "apiGetUsers.jsp", true);
	
	xhr.send();
		
}