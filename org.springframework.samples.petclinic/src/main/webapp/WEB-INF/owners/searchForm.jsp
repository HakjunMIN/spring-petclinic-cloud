<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %***REMOVED***
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %***REMOVED***

<h2***REMOVED***Search Owners</h2***REMOVED***

<form:form id="searchForm" action="owners/search" modelAttribute="ownerSearchForm" method="get"***REMOVED***
	<form:label for="lastName" path="lastName"***REMOVED***
		Last Name
		<form:input path="lastName" /***REMOVED***
	</form:label***REMOVED***
	<input type="submit" value="Search" /***REMOVED***	
</form:form***REMOVED***