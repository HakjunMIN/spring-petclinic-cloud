<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %***REMOVED***
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %***REMOVED***
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %***REMOVED***

<html lang="en"***REMOVED***

<jsp:include page="../header.jsp"/***REMOVED***

<body***REMOVED***

	<div class="container"***REMOVED***
		<***REMOVED***url value="/resources/images/banner-graphic.png" var="banner"/***REMOVED***
		<img src="${banner***REMOVED***" /***REMOVED***
  
		<h2***REMOVED***Owner Information</h2***REMOVED***
	
	  <table class="table table-striped"  style="width:600px;"***REMOVED***
	    <tr***REMOVED***
	      <th***REMOVED***Name</th***REMOVED***
	      <td***REMOVED***<b***REMOVED***${owner.firstName***REMOVED*** ${owner.lastName***REMOVED***</b***REMOVED***</td***REMOVED***
	    </tr***REMOVED***
	    <tr***REMOVED***
	      <th***REMOVED***Address</th***REMOVED***
	      <td***REMOVED***${owner.address***REMOVED***</td***REMOVED***
	    </tr***REMOVED***
	    <tr***REMOVED***
	      <th***REMOVED***City</th***REMOVED***
	      <td***REMOVED***${owner.city***REMOVED***</td***REMOVED***
	    </tr***REMOVED***
	    <tr***REMOVED***
	      <th***REMOVED***Telephone </th***REMOVED***
	      <td***REMOVED***${owner.telephone***REMOVED***</td***REMOVED***
	    </tr***REMOVED***
	  </table***REMOVED***
	  <table class="table-buttons"***REMOVED***
	    <tr***REMOVED***
	      <td colspan="2" align="center"***REMOVED***
	        <***REMOVED***url value="{ownerId***REMOVED***/edit" var="editUrl"***REMOVED***
	        	<***REMOVED***param name="ownerId" value="${owner.id***REMOVED***" /***REMOVED***
	        </***REMOVED***url***REMOVED***
	        <a href="${fn:escapeXml(editUrl)***REMOVED***"***REMOVED***Edit Owner</a***REMOVED***
	      </td***REMOVED***
	      <td***REMOVED***
	        <***REMOVED***url value="{ownerId***REMOVED***/pets/new" var="addUrl"***REMOVED***
	        	<***REMOVED***param name="ownerId" value="${owner.id***REMOVED***" /***REMOVED***
	        </***REMOVED***url***REMOVED***
	        <a href="${fn:escapeXml(addUrl)***REMOVED***"***REMOVED***Add New Pet</a***REMOVED***
	      </td***REMOVED***
	    </tr***REMOVED***
	  </table***REMOVED***
	
	  <h2***REMOVED***Pets and Visits</h2***REMOVED***
	
	  <c:forEach var="pet" items="${owner.pets***REMOVED***"***REMOVED***
	    <table class="table" style="width:600px;"***REMOVED***
	      <tr***REMOVED***
	        <td valign="top"***REMOVED***
	          <table***REMOVED***
	            <tr***REMOVED***
	              <th***REMOVED***Name</th***REMOVED***
	              <td***REMOVED***<b***REMOVED***${pet.name***REMOVED***</b***REMOVED***</td***REMOVED***
	            </tr***REMOVED***
	            <tr***REMOVED***
	              <th***REMOVED***Birth Date</th***REMOVED***
	              <td***REMOVED***<fmt:formatDate value="${pet.birthDate***REMOVED***" pattern="yyyy-MM-dd"/***REMOVED***</td***REMOVED***
	            </tr***REMOVED***
	            <tr***REMOVED***
	              <th***REMOVED***Type</th***REMOVED***
	              <td***REMOVED***${pet.type.name***REMOVED***</td***REMOVED***
	            </tr***REMOVED***
	          </table***REMOVED***
	        </td***REMOVED***
	        <td valign="top"***REMOVED***
	          <table***REMOVED***
	            <thead***REMOVED***
	            	<tr***REMOVED***
		              <th***REMOVED***Visit Date</th***REMOVED***
		              <th***REMOVED***Description</th***REMOVED***
	              	</tr***REMOVED***
	            </thead***REMOVED***
	            <c:forEach var="visit" items="${pet.visits***REMOVED***"***REMOVED***
	              <tr***REMOVED***
	                <td***REMOVED***<fmt:formatDate value="${visit.date***REMOVED***" pattern="yyyy-MM-dd"/***REMOVED***</td***REMOVED***
	                <td***REMOVED***${visit.description***REMOVED***</td***REMOVED***
	              </tr***REMOVED***
	            </c:forEach***REMOVED***
	          </table***REMOVED***
	        </td***REMOVED***
	      </tr***REMOVED***
	    </table***REMOVED***
	    <table class="table-buttons"***REMOVED***
	      <tr***REMOVED***
	        <td***REMOVED***
	          <***REMOVED***url value="/owners/{ownerId***REMOVED***/pets/{petId***REMOVED***/edit" var="petUrl"***REMOVED***
	            <***REMOVED***param name="ownerId" value="${owner.id***REMOVED***"/***REMOVED***
	            <***REMOVED***param name="petId" value="${pet.id***REMOVED***"/***REMOVED***
	          </***REMOVED***url***REMOVED***
	          <a href="${fn:escapeXml(petUrl)***REMOVED***"***REMOVED***Edit Pet</a***REMOVED***
	        </td***REMOVED***
	        <td***REMOVED***</td***REMOVED***
	        <td***REMOVED***
	          <***REMOVED***url value="/owners/{ownerId***REMOVED***/pets/{petId***REMOVED***/visits/new" var="visitUrl"***REMOVED***
	            <***REMOVED***param name="ownerId" value="${owner.id***REMOVED***"/***REMOVED***
	            <***REMOVED***param name="petId" value="${pet.id***REMOVED***"/***REMOVED***
	          </***REMOVED***url***REMOVED***
	          <a href="${fn:escapeXml(visitUrl)***REMOVED***"***REMOVED***Add Visit</a***REMOVED***
	        </td***REMOVED***
	        <td***REMOVED***</td***REMOVED***
	        <td***REMOVED***
	          <***REMOVED***url value="/owners/{ownerId***REMOVED***/pets/{petId***REMOVED***/visits.atom" var="feedUrl"***REMOVED***
	            <***REMOVED***param name="ownerId" value="${owner.id***REMOVED***"/***REMOVED***
	            <***REMOVED***param name="petId" value="${pet.id***REMOVED***"/***REMOVED***
	          </***REMOVED***url***REMOVED***
	          <a href="${fn:escapeXml(feedUrl)***REMOVED***" rel="alternate" type="application/atom+xml"***REMOVED***Atom Feed</a***REMOVED***
	        </td***REMOVED***
	      </tr***REMOVED***
	    </table***REMOVED***
	  </c:forEach***REMOVED***
	  
	  <jsp:include page="../footer.jsp"/***REMOVED***
  
  	</div***REMOVED***

</body***REMOVED***

</html***REMOVED***
