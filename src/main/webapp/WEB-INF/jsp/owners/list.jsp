<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %***REMOVED***
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %***REMOVED***
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %***REMOVED***


<html lang="en"***REMOVED***

<jsp:include page="../header.jsp"/***REMOVED***

<body***REMOVED***

  <div id="main"***REMOVED***

<h2***REMOVED***Owners:</h2***REMOVED***

	<table***REMOVED***
	  <thead***REMOVED***
	  	<tr***REMOVED***
		    <th***REMOVED***Name</th***REMOVED***
		    <th***REMOVED***Address</th***REMOVED***
		    <th***REMOVED***City</th***REMOVED***
		    <th***REMOVED***Telephone</th***REMOVED***
		    <th***REMOVED***Pets</th***REMOVED***
	    </tr***REMOVED***
	  </thead***REMOVED***
	  <c:forEach var="owner" items="${selections***REMOVED***"***REMOVED***
	    <tr***REMOVED***
	      <td***REMOVED***
	          <***REMOVED***url value="owners/{ownerId***REMOVED***" var="ownerUrl"***REMOVED***
	              <***REMOVED***param name="ownerId" value="${owner.id***REMOVED***"/***REMOVED***
	          </***REMOVED***url***REMOVED***
	          <a href="${fn:escapeXml(ownerUrl)***REMOVED***"***REMOVED***${owner.firstName***REMOVED*** ${owner.lastName***REMOVED***</a***REMOVED***
	      </td***REMOVED***
	      <td***REMOVED***${owner.address***REMOVED***</td***REMOVED***
	      <td***REMOVED***${owner.city***REMOVED***</td***REMOVED***
	      <td***REMOVED***${owner.telephone***REMOVED***</td***REMOVED***
	      <td***REMOVED***
	        <c:forEach var="pet" items="${owner.pets***REMOVED***"***REMOVED***
	          ${pet.name***REMOVED*** &nbsp;
	        </c:forEach***REMOVED***
	      </td***REMOVED***
	    </tr***REMOVED***
	  </c:forEach***REMOVED***
	</table***REMOVED***

  	</div***REMOVED***
	<jsp:include page="../footer.jsp"/***REMOVED***
</body***REMOVED***

</html***REMOVED***
