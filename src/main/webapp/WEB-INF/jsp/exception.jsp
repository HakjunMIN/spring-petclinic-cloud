<html lang="en"***REMOVED***
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %***REMOVED***

<jsp:include page="fragments/headTag.jsp"/***REMOVED***

<body***REMOVED***
<div class="container"***REMOVED***
    <jsp:include page="fragments/bodyHeader.jsp"/***REMOVED***
    <***REMOVED***url value="/resources/images/pets.png" var="petsImage"/***REMOVED***
    <img src="${petsImage***REMOVED***"/***REMOVED***

    <h2***REMOVED***Something happened***REMOVED***</h2***REMOVED***

    <p***REMOVED***${exception.message***REMOVED***</p***REMOVED***

    <!-- Exception: ${exception.message***REMOVED***.
		  	<c:forEach items="${exception.stackTrace***REMOVED***" var="stackTrace"***REMOVED*** 
				${stackTrace***REMOVED*** 
			</c:forEach***REMOVED***
	  	--***REMOVED***


    <jsp:include page="fragments/footer.jsp"/***REMOVED***

</div***REMOVED***
</body***REMOVED***

</html***REMOVED***
