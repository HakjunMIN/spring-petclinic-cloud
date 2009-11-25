<%@ include file="/WEB-INF/jsp/includes.jsp" %***REMOVED***
<%@ include file="/WEB-INF/jsp/header.jsp" %***REMOVED***

<h2***REMOVED***Veterinarians:</h2***REMOVED***

<table***REMOVED***
  <thead***REMOVED***
    <th***REMOVED***Name</th***REMOVED***
    <th***REMOVED***Specialties</th***REMOVED***
  </thead***REMOVED***
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
</table***REMOVED***
<table class="table-buttons"***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***
      <a href="<***REMOVED***url value="/vets.xml" htmlEscape="true" /***REMOVED***"***REMOVED***View as XML</a***REMOVED***
    </td***REMOVED***
  </tr***REMOVED***
</table***REMOVED***

<%@ include file="/WEB-INF/jsp/footer.jsp" %***REMOVED***
