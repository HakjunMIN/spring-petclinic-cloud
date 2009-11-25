<%@ include file="/WEB-INF/jsp/includes.jsp" %***REMOVED***
<%@ include file="/WEB-INF/jsp/header.jsp" %***REMOVED***


<h2***REMOVED***Find Owners:</h2***REMOVED***

<***REMOVED***url value="/owners" var="formUrl"/***REMOVED***
<form:form modelAttribute="owner" action="${fn:escapeXml(formUrl)***REMOVED***" method="get"***REMOVED***
  <table***REMOVED***
    <tr***REMOVED***
      <th***REMOVED***
        Last Name: <form:errors path="*" cssClass="errors"/***REMOVED***
        <br/***REMOVED*** 
        <form:input path="lastName" size="30" maxlength="80" /***REMOVED***
      </th***REMOVED***
    </tr***REMOVED***
    <tr***REMOVED***
      <td***REMOVED***<p class="submit"***REMOVED***<input type="submit" value="Find Owners"/***REMOVED***</p***REMOVED***</td***REMOVED***
    </tr***REMOVED***
  </table***REMOVED***
</form:form***REMOVED***

<br/***REMOVED***
<a href='<***REMOVED***url value="/owners/new" htmlEscape="true"/***REMOVED***'***REMOVED***Add Owner</a***REMOVED***

<%@ include file="/WEB-INF/jsp/footer.jsp" %***REMOVED***
