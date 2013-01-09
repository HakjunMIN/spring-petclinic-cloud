<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %***REMOVED***
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %***REMOVED***
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %***REMOVED***

<html lang="en"***REMOVED***

<jsp:include page="header.jsp"/***REMOVED***

<body***REMOVED***

  <div id="main"***REMOVED***

	<h2***REMOVED***Internal error</h2***REMOVED***
	<p/***REMOVED***

	<% 
	try {
		// The Servlet spec guarantees this attribute will be available
		Throwable exception = (Throwable) request.getAttribute("javax.servlet.error.exception"); 
	
		if (exception != null) {
			if (exception instanceof ServletException) {
				// It's a ServletException: we should extract the root cause
				ServletException sex = (ServletException) exception;
				Throwable rootCause = sex.getRootCause();
				if (rootCause == null)
					rootCause = sex;
				out.println("** Root cause is: "+ rootCause.getMessage());
				rootCause.printStackTrace(new java.io.PrintWriter(out)); 
			***REMOVED***
			else {
				// It's not a ServletException, so we'll just show it
				exception.printStackTrace(new java.io.PrintWriter(out)); 
			***REMOVED***
		***REMOVED*** 
		else  {
	    	out.println("No error information available");
		***REMOVED*** 
	
		// Display cookies
		out.println("\nCookies:\n");
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
	    	for (int i = 0; i < cookies.length; i++) {
	      		out.println(cookies[i].getName() + "=[" + cookies[i].getValue() + "]");
			***REMOVED***
		***REMOVED***
		    
	***REMOVED*** catch (Exception ex) { 
		ex.printStackTrace(new java.io.PrintWriter(out));
	***REMOVED***
	%***REMOVED***

	<p/***REMOVED***
	<br/***REMOVED***


  	</div***REMOVED***

	<jsp:include page="footer.jsp"/***REMOVED***
</body***REMOVED***

</html***REMOVED***
