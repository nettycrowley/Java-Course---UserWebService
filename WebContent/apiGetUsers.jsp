<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*, com.rc.customer.*, com.fasterxml.jackson.databind.*" %>


<%

	//ArrayList<String> strings = new ArrayList<String>();

	UserDb userDb  = new UserDb();

	ArrayList<User> users = userDb.getAll();

	ObjectMapper objectMapper = new ObjectMapper();
	String json = objectMapper.writeValueAsString(users);
%>
<%=json %>
