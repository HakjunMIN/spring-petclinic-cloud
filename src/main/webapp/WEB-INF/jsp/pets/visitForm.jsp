<%@ include file="/WEB-INF/jsp/includes.jsp" %***REMOVED***
<%@ include file="/WEB-INF/jsp/header.jsp" %***REMOVED***

<h2***REMOVED***<c:if test="${visit.new***REMOVED***"***REMOVED***New </c:if***REMOVED***Visit:</h2***REMOVED***

<form:form modelAttribute="visit"***REMOVED***
  <b***REMOVED***Pet:</b***REMOVED***
  <table width="333"***REMOVED***
    <thead***REMOVED***
      <th***REMOVED***Name</th***REMOVED***
      <th***REMOVED***Birth Date</th***REMOVED***
      <th***REMOVED***Type</th***REMOVED***
      <th***REMOVED***Owner</th***REMOVED***
    </thead***REMOVED***
    <tr***REMOVED***
      <td***REMOVED***${visit.pet.name***REMOVED***</td***REMOVED***
      <td***REMOVED***<fmt:formatDate value="${visit.pet.birthDate***REMOVED***" pattern="yyyy-MM-dd"/***REMOVED***</td***REMOVED***
      <td***REMOVED***${visit.pet.type.name***REMOVED***</td***REMOVED***
      <td***REMOVED***${visit.pet.owner.firstName***REMOVED*** ${visit.pet.owner.lastName***REMOVED***</td***REMOVED***
    </tr***REMOVED***
  </table***REMOVED***

  <table width="333"***REMOVED***
    <tr***REMOVED***
      <th***REMOVED***
        Date:
        <br/***REMOVED***<form:errors path="date" cssClass="errors"/***REMOVED***
      </th***REMOVED***
      <td***REMOVED***
        <form:input path="date" size="10" maxlength="10"/***REMOVED*** (yyyy-mm-dd)
      </td***REMOVED***
    <tr/***REMOVED***
    <tr***REMOVED***
      <th valign="top"***REMOVED***
        Description:
        <br/***REMOVED***<form:errors path="description" cssClass="errors"/***REMOVED***
      </th***REMOVED***
      <td***REMOVED***
        <form:textarea path="description" rows="10" cols="25"/***REMOVED***
      </td***REMOVED***
    </tr***REMOVED***
    <tr***REMOVED***
      <td colspan="2"***REMOVED***
        <input type="hidden" name="petId" value="${visit.pet.id***REMOVED***"/***REMOVED***
        <p class="submit"***REMOVED***<input type="submit" value="Add Visit"/***REMOVED***</p***REMOVED***
      </td***REMOVED***
    </tr***REMOVED***
  </table***REMOVED***
</form:form***REMOVED***

<br/***REMOVED***
<b***REMOVED***Previous Visits:</b***REMOVED***
<table width="333"***REMOVED***
  <tr***REMOVED***
    <th***REMOVED***Date</th***REMOVED***
    <th***REMOVED***Description</th***REMOVED***
  </tr***REMOVED***
  <c:forEach var="visit" items="${visit.pet.visits***REMOVED***"***REMOVED***
    <c:if test="${!visit.new***REMOVED***"***REMOVED***
      <tr***REMOVED***
        <td***REMOVED***<fmt:formatDate value="${visit.date***REMOVED***" pattern="yyyy-MM-dd"/***REMOVED***</td***REMOVED***
        <td***REMOVED***${visit.description***REMOVED***</td***REMOVED***
      </tr***REMOVED***
    </c:if***REMOVED***
  </c:forEach***REMOVED***
</table***REMOVED***

<%@ include file="/WEB-INF/jsp/footer.jsp" %***REMOVED***
