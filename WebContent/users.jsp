<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="com.rc.customer.*, java.util.ArrayList" %>

<%
UserDb userDb = new UserDb();
ArrayList<User> users = userDb.getAll();
%>    

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

<h3>Revenue Users System</h3>
<a href="users.jsp">Home</a><br>

<form action="editUser.jsp" method="get">

	<select name="id" id="id" size="6">
	<% for (User user : users) { %>
	
		<option value="<%=user.getId()%>">
			<%=user.getFirstName() + " " + user.getLastName() %>
		</option>
	<% } %>
	</select>
	<input type="submit" name="submit" value="edit">
</form>

<a href="addUser.jsp">Add a user</a><br>
<a href="deleteUser.jsp">Delete a user</a><br>


</body>
</html>