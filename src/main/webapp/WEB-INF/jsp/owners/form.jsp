<%@ include file="/WEB-INF/jsp/includes.jsp" %***REMOVED***
<%@ include file="/WEB-INF/jsp/header.jsp" %***REMOVED***
<c:choose***REMOVED***
	<c:when test="${owner['new']***REMOVED***"***REMOVED***<c:set var="method" value="post"/***REMOVED***</c:when***REMOVED***
	<c:otherwise***REMOVED***<c:set var="method" value="put"/***REMOVED***</c:otherwise***REMOVED***
</c:choose***REMOVED***

<h2***REMOVED***<c:if test="${owner['new']***REMOVED***"***REMOVED***New </c:if***REMOVED***Owner:</h2***REMOVED***
<form:form modelAttribute="owner" method="${method***REMOVED***"***REMOVED***
  <table***REMOVED***
    <tr***REMOVED***
      <th***REMOVED***
        First Name: <form:errors path="firstName" cssClass="errors"/***REMOVED***
        <br/***REMOVED***
        <form:input path="firstName" size="30" maxlength="80"/***REMOVED***
      </th***REMOVED***
    </tr***REMOVED***
    <tr***REMOVED***
      <th***REMOVED***
        Last Name: <form:errors path="lastName" cssClass="errors"/***REMOVED***
        <br/***REMOVED***
        <form:input path="lastName" size="30" maxlength="80"/***REMOVED***
      </th***REMOVED***
    </tr***REMOVED***
    <tr***REMOVED***
      <th***REMOVED***
        Address: <form:errors path="address" cssClass="errors"/***REMOVED***
        <br/***REMOVED***
        <form:input path="address" size="30" maxlength="80"/***REMOVED***
      </th***REMOVED***
    </tr***REMOVED***
    <tr***REMOVED***
      <th***REMOVED***
        City: <form:errors path="city" cssClass="errors"/***REMOVED***
        <br/***REMOVED***
        <form:input path="city" size="30" maxlength="80"/***REMOVED***
      </th***REMOVED***
    </tr***REMOVED***
    <tr***REMOVED***
      <th***REMOVED***
        Telephone: <form:errors path="telephone" cssClass="errors"/***REMOVED***
        <br/***REMOVED***
        <form:input path="telephone" size="20" maxlength="20"/***REMOVED***
      </th***REMOVED***
    </tr***REMOVED***
    <tr***REMOVED***
      <td***REMOVED***
        <c:choose***REMOVED***
          <c:when test="${owner['new']***REMOVED***"***REMOVED***
            <p class="submit"***REMOVED***<input type="submit" value="Add Owner"/***REMOVED***</p***REMOVED***
          </c:when***REMOVED***
          <c:otherwise***REMOVED***
            <p class="submit"***REMOVED***<input type="submit" value="Update Owner"/***REMOVED***</p***REMOVED***
          </c:otherwise***REMOVED***
        </c:choose***REMOVED***
      </td***REMOVED***
    </tr***REMOVED***
  </table***REMOVED***
</form:form***REMOVED***

<%@ include file="/WEB-INF/jsp/footer.jsp" %***REMOVED***
