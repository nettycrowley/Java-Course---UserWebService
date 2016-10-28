<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*, com.rc.customer.*, com.fasterxml.jackson.databind.*" %>


<%
	int id = Integer.parseInt(request.getParameter("id"));
	ArrayList<String> strings = new ArrayList<String>();

	UserDb userDb  = new UserDb();

	userDb.delete(id);
	
	String json = "{\"status\":\"ok\", \"id\":" + id + "}";
%>
<%=json %>
