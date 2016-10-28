<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*, com.rc.customer.*, com.fasterxml.jackson.databind.*" %>


<%
	String json = "{}";
	
	try {
		String firstName = request.getParameter("firstName");
		String lastName = request.getParameter("lastName");
		boolean registered = request.getParameter("registered").equals("1");
		String dateOfBirth = request.getParameter("dateOfBirth");
		
		User user = new User(-1, firstName, lastName, registered, dateOfBirth);
		
		UserDb userDb  = new UserDb();
	
		userDb.create(user);
		userDb.close();
		
		json = "{\"status\":\"ok\", \"id\":" + user.getId() + "}";
	} catch(UserDbException ex) {
		response.sendError(500, ex.getMessage());
	} 
%>
<%=json %>
