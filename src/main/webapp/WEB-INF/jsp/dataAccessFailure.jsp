<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***


<html lang="en"***REMOVED***

<jsp:include page="header.jsp"/***REMOVED***

<body***REMOVED***
	<div id="main"***REMOVED***
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
		
  </div***REMOVED***
		<jsp:include page="footer.jsp"/***REMOVED***

</body***REMOVED***

</html***REMOVED***
