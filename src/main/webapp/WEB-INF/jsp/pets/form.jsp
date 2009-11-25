<%@ include file="/WEB-INF/jsp/includes.jsp" %***REMOVED***
<%@ include file="/WEB-INF/jsp/header.jsp" %***REMOVED***
<c:choose***REMOVED***
	<c:when test="${pet.new***REMOVED***"***REMOVED***<c:set var="method" value="post"/***REMOVED***</c:when***REMOVED***
	<c:otherwise***REMOVED***<c:set var="method" value="put"/***REMOVED***</c:otherwise***REMOVED***
</c:choose***REMOVED***

<h2***REMOVED***<c:if test="${pet.new***REMOVED***"***REMOVED***New </c:if***REMOVED***Pet</h2***REMOVED***

<b***REMOVED***Owner:</b***REMOVED*** ${pet.owner.firstName***REMOVED*** ${pet.owner.lastName***REMOVED***
<br/***REMOVED***
<form:form modelAttribute="pet" method="${method***REMOVED***"***REMOVED***
  <table***REMOVED***
    <tr***REMOVED***
      <th***REMOVED***
        Name: <form:errors path="name" cssClass="errors"/***REMOVED***
        <br/***REMOVED***
        <form:input path="name" size="30" maxlength="30"/***REMOVED***
      </th***REMOVED***
    </tr***REMOVED***
    <tr***REMOVED***
      <th***REMOVED***
        Birth Date: <form:errors path="birthDate" cssClass="errors"/***REMOVED***
        <br/***REMOVED***
        <form:input path="birthDate" size="10" maxlength="10"/***REMOVED*** (yyyy-mm-dd)
      </th***REMOVED***
    </tr***REMOVED***
    <tr***REMOVED***
      <th***REMOVED***
        Type: <form:errors path="type" cssClass="errors"/***REMOVED***
        <br/***REMOVED***
        <form:select path="type" items="${types***REMOVED***"/***REMOVED***
      </th***REMOVED***
    </tr***REMOVED***
    <tr***REMOVED***
      <td***REMOVED***
        <c:choose***REMOVED***
          <c:when test="${pet.new***REMOVED***"***REMOVED***
            <p class="submit"***REMOVED***<input type="submit" value="Add Pet"/***REMOVED***</p***REMOVED***
          </c:when***REMOVED***
          <c:otherwise***REMOVED***
            <p class="submit"***REMOVED***<input type="submit" value="Update Pet"/***REMOVED***</p***REMOVED***
          </c:otherwise***REMOVED***
        </c:choose***REMOVED***
      </td***REMOVED***
    </tr***REMOVED***
  </table***REMOVED***
</form:form***REMOVED***

<c:if test="${!pet.new***REMOVED***"***REMOVED***
  <form:form method="delete"***REMOVED***
    <p class="submit"***REMOVED***<input type="submit" value="Delete Pet"/***REMOVED***</p***REMOVED***
  </form:form***REMOVED***
</c:if***REMOVED***    

<%@ include file="/WEB-INF/jsp/footer.jsp" %***REMOVED***
