<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*, com.rc.customer.*, com.fasterxml.jackson.databind.*" %>


<%
	
	int id = Integer.parseInt(request.getParameter("id"));
	String firstName = request.getParameter("firstName");
	String lastName = request.getParameter("lastName");
	boolean registered = request.getParameter("registered").equals("1");
	String dateOfBirth = request.getParameter("dateOfBirth");

	User user = new User(id, firstName, lastName, registered, dateOfBirth);
	
	UserDb userDb  = new UserDb();

	userDb.update(user);
	
	String json = "{\"status\":\"ok\", \"id\":" + user.getId() + "}";
	
	userDb.close();
%>
<%=json %>
