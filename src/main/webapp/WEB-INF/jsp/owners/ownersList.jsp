<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %***REMOVED***
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %***REMOVED***
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %***REMOVED***


<html lang="en"***REMOVED***

<jsp:include page="../header.jsp"/***REMOVED***

<body***REMOVED***

  	<div class="container"***REMOVED***

		<***REMOVED***url value="/resources/images/banner-graphic.png" var="banner"/***REMOVED***
		<img src="${banner***REMOVED***" /***REMOVED***
		<h2***REMOVED***Owners</h2***REMOVED***
	
		<table class="table table-striped"***REMOVED***
		  <thead***REMOVED***
		  	<tr***REMOVED***
			    <th style="width: 150px;"***REMOVED***Name</th***REMOVED***
			    <th style="width: 200px;"***REMOVED***Address</th***REMOVED***
			    <th***REMOVED***City</th***REMOVED***
			    <th***REMOVED***Telephone</th***REMOVED***
			    <th style="width: 100px;"***REMOVED***Pets</th***REMOVED***
		    </tr***REMOVED***
		  </thead***REMOVED***
		  <c:forEach var="owner" items="${selections***REMOVED***"***REMOVED***
		    <tr***REMOVED***
		      <td***REMOVED***
		          <***REMOVED***url value="owners/{ownerId***REMOVED***.html" var="ownerUrl"***REMOVED***
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
		<jsp:include page="../footer.jsp"/***REMOVED***
	
	  	</div***REMOVED***
</body***REMOVED***

</html***REMOVED***
