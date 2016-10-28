<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ page import="java.util.*,com.rc.customer.User,com.rc.customer.UserDb" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

<%
UserDb userDb = new UserDb();

ArrayList<User> users = userDb.getAll();

for (User user: users) {
	out.println(user);
}

User user = new User(-1, "Aidan", "Killeen", false, "2000-01-01");

out.println(user.toJson());
ArrayList<String> list = new ArrayList<String>();

list.add("Aidan");

for (String s:list) {
	out.println(s);
}


%>
</body>
</html>