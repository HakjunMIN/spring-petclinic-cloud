<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %***REMOVED***
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %***REMOVED***
<h2***REMOVED***Add New Owner</h2***REMOVED***

<form:form id="addNewForm" action="${pageContext.request.contextPath***REMOVED***/owners" modelAttribute="owner" method="post"***REMOVED***
	<form:label for="firstName" path="firstName"***REMOVED***
		First Name
		<form:input path="firstName" /***REMOVED***
	</form:label***REMOVED***
	<form:label for="lastName" path="lastName"***REMOVED***
		Last Name
		<form:input path="lastName" /***REMOVED***
	</form:label***REMOVED***
	<input type="submit" value="Add" /***REMOVED***	
</form:form***REMOVED***