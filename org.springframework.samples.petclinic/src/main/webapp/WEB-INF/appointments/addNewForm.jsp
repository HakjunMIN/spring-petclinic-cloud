<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %***REMOVED***
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %***REMOVED***
<h2***REMOVED***Add New Appointment</h2***REMOVED***

<form:form id="addNewForm" action="${pageContext.request.contextPath***REMOVED***/appointments" modelAttribute="appointment" method="post"***REMOVED***
	<form:label for="doctor" path="doctor"***REMOVED***
		Doctor
		<form:input path="doctor" /***REMOVED***
	</form:label***REMOVED***
	<form:label for="owner" path="owner"***REMOVED***
		Owner
		<form:input path="owner" /***REMOVED***
	</form:label***REMOVED***
	<form:label for="pet" path="pet"***REMOVED***
		Pet
		<form:input path="pet" /***REMOVED***
	</form:label***REMOVED***
	<form:label for="date" path="date"***REMOVED***
		Date
		<form:input path="date" /***REMOVED***
	</form:label***REMOVED***
	<form:label for="time" path="time"***REMOVED***
		Time
		<form:input path="time" /***REMOVED***
	</form:label***REMOVED***
	<form:label for="notes" path="notes"***REMOVED***
		Notes
		<form:input path="notes" /***REMOVED***
	</form:label***REMOVED***
	<input type="submit" value="Add" /***REMOVED***	
</form:form***REMOVED***