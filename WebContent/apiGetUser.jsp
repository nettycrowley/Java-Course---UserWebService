<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*, com.rc.customer.*, com.fasterxml.jackson.databind.*" %>


<%

	String json = "{}";
	
	try {
		int id = Integer.parseInt(request.getParameter("id"));
	
		UserDb userDb  = new UserDb();
	
		User user = userDb.getUser(id);
	
		ObjectMapper objectMapper = new ObjectMapper();
		json = objectMapper.writeValueAsString(user);
		
	} catch (UserDbException ex) {
		//no user id
		response.sendError(404, "User not found");
	}catch (NullPointerException ex) {
		//id was missing
		response.sendError(400, "Bad request - Missing Parameter");
	}catch (NumberFormatException ex) {
		//id was not a number
		response.sendError(501, "Internal server error - id is not a number");
	}
%>
<%=json %>
