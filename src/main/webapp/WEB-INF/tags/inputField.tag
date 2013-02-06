<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %***REMOVED***
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %***REMOVED***
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ attribute name="name" required="true" rtexprvalue="true" description="Name of corresponding property in bean object"%***REMOVED***
<%@ attribute name="label" required="true" rtexprvalue="true" description="Label appears in red color if input is considered as invalid after submission"%***REMOVED***

<***REMOVED***bind path="${name***REMOVED***"***REMOVED***
	<c:set var="cssGroup" value="control-group ${status.error ? 'error' : '' ***REMOVED***"/***REMOVED***
	<div class="${cssGroup***REMOVED***"***REMOVED***
		<label class="control-label"***REMOVED***${label***REMOVED***</label***REMOVED***
		<div class="controls"***REMOVED***
			<form:input path="${name***REMOVED***"/***REMOVED*** 
			<span class="help-inline"***REMOVED***${status.errorMessage***REMOVED***</span***REMOVED***
		</div***REMOVED***
	</div***REMOVED***
</***REMOVED***bind***REMOVED***