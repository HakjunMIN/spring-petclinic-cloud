<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %***REMOVED***


<html lang="en"***REMOVED***

<jsp:include page="header.jsp"/***REMOVED***

<body***REMOVED***
  	<div class="container"***REMOVED***
		<***REMOVED***url value="/resources/images/banner-graphic.png" var="banner"/***REMOVED***
		<img src="${banner***REMOVED***" /***REMOVED***
		<img src="<***REMOVED***url value="/resources/images/pets.png" htmlEscape="true" /***REMOVED***" align="right" style="position:relative;right:30px;"***REMOVED***</img***REMOVED***
		<h2***REMOVED***<fmt:message key="welcome"/***REMOVED***</h2***REMOVED***
		
		<ul class="unstyled"***REMOVED***
		  <li***REMOVED***<a href="<***REMOVED***url value="/owners/search.html" htmlEscape="true" /***REMOVED***"***REMOVED***Find owner</a***REMOVED***</li***REMOVED***
		  <li***REMOVED***<a href="<***REMOVED***url value="/vets.html" htmlEscape="true" /***REMOVED***"***REMOVED***Display all veterinarians</a***REMOVED***</li***REMOVED***
		  <li***REMOVED***<a href="<***REMOVED***url value="/resources/html/tutorial.html" htmlEscape="true" /***REMOVED***"***REMOVED***Tutorial</a***REMOVED***</li***REMOVED***
		</ul***REMOVED***
		
	
		<jsp:include page="footer.jsp"/***REMOVED***

  	</div***REMOVED***
</body***REMOVED***

</html***REMOVED***
