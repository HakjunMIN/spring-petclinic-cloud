<%@ include file="/WEB-INF/jsp/includes.jsp" %***REMOVED***
<%@ include file="/WEB-INF/jsp/header.jsp" %***REMOVED***

<h2***REMOVED***Owners:</h2***REMOVED***

<table***REMOVED***
  <thead***REMOVED***
    <th***REMOVED***Name</th***REMOVED***
    <th***REMOVED***Address</th***REMOVED***
    <th***REMOVED***City</th***REMOVED***
    <th***REMOVED***Telephone</th***REMOVED***
    <th***REMOVED***Pets</th***REMOVED***
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

<%@ include file="/WEB-INF/jsp/footer.jsp" %***REMOVED***
