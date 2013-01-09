<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %***REMOVED***
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %***REMOVED***


<html lang="en"***REMOVED***

<jsp:include page="header.jsp"/***REMOVED***

<body***REMOVED***

  <div id="main"***REMOVED***

	<h2***REMOVED***Veterinarians:</h2***REMOVED***
	
		<table***REMOVED***
		  <thead***REMOVED***
		  	<tr***REMOVED***
			    <th***REMOVED***Name</th***REMOVED***
			    <th***REMOVED***Specialties</th***REMOVED***
		    </tr***REMOVED***
		  </thead***REMOVED***
		  <tbody***REMOVED***
			  <c:forEach var="vet" items="${vets.vetList***REMOVED***"***REMOVED***
			    <tr***REMOVED***
			      <td***REMOVED***${vet.firstName***REMOVED*** ${vet.lastName***REMOVED***</td***REMOVED***
			      <td***REMOVED***
				    <c:forEach var="specialty" items="${vet.specialties***REMOVED***"***REMOVED***
			          ${specialty.name***REMOVED***
			        </c:forEach***REMOVED***
			        <c:if test="${vet.nrOfSpecialties == 0***REMOVED***"***REMOVED***none</c:if***REMOVED***
			      </td***REMOVED***
			    </tr***REMOVED***
			  </c:forEach***REMOVED***
		  </tbody***REMOVED***
		</table***REMOVED***
		<table class="table-buttons"***REMOVED***
		  <tr***REMOVED***
		    <td***REMOVED***
		      <a href="<***REMOVED***url value="/vets.xml" htmlEscape="true" /***REMOVED***"***REMOVED***View as XML</a***REMOVED***
		    </td***REMOVED***
		  </tr***REMOVED***
		</table***REMOVED***

  	</div***REMOVED***
	<jsp:include page="footer.jsp"/***REMOVED***
</body***REMOVED***

</html***REMOVED***
