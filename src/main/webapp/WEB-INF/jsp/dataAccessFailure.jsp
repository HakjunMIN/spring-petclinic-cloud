<%@ include file="/WEB-INF/jsp/includes.jsp" %***REMOVED***
<%@ include file="/WEB-INF/jsp/header.jsp" %***REMOVED***

<%
Exception ex = (Exception) request.getAttribute("exception");
%***REMOVED***

<h2***REMOVED***Data access failure: <%= ex.getMessage() %***REMOVED***</h2***REMOVED***
<p/***REMOVED***

<%
ex.printStackTrace(new java.io.PrintWriter(out));
%***REMOVED***

<p/***REMOVED***
<br/***REMOVED***
<a href="<***REMOVED***url value="/" htmlEscape="true" /***REMOVED***"***REMOVED***Home</a***REMOVED***

<%@ include file="/WEB-INF/jsp/footer.jsp" %***REMOVED***
