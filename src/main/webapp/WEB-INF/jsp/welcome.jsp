<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %***REMOVED***


<html lang="en"***REMOVED***

<jsp:include page="fragments/headTag.jsp"/***REMOVED***

<body***REMOVED***
  	<div class="container"***REMOVED***
		<jsp:include page="fragments/bodyHeader.jsp"/***REMOVED***
		<h2***REMOVED***<fmt:message key="welcome"/***REMOVED***</h2***REMOVED***		
		<***REMOVED***url value="/resources/images/pets.png" htmlEscape="true" var="petsImage"/***REMOVED***
		<img src="${petsImage***REMOVED***" /***REMOVED***
	
		<jsp:include page="fragments/footer.jsp"/***REMOVED***

  	</div***REMOVED***
</body***REMOVED***

</html***REMOVED***
