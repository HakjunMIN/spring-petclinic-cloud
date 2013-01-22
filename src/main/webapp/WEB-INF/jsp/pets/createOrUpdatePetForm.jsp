<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %***REMOVED***
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %***REMOVED***


<html lang="en"***REMOVED***


<body***REMOVED***
	<head***REMOVED***
			<***REMOVED***url value="/webjars/jquery/1.8.2/jquery.js" var="jQuery" /***REMOVED***
			<script src="${jQuery***REMOVED***"***REMOVED***</script***REMOVED***
			
			<***REMOVED***url value="/webjars/jquery-ui/1.9.1/js/jquery-ui-1.9.1.custom.js" var="jQueryUi" /***REMOVED***
			<script src="${jQueryUi***REMOVED***"***REMOVED***</script***REMOVED***
			
			<***REMOVED***url value="/webjars/jquery-ui/1.9.1/css/smoothness/jquery-ui-1.9.1.custom.css" var="jQueryUiCss" /***REMOVED***
			<link href="${jQueryUiCss***REMOVED***" rel="stylesheet"***REMOVED***</link***REMOVED***
				
	
	</head***REMOVED***
  	<div class="container"***REMOVED***
			
<script***REMOVED***
	        $(function() {
	            $( "#birthDate" ).datepicker();
	  ***REMOVED***);
	    </script***REMOVED***
		<form:form modelAttribute="pet" class="form-horizontal"***REMOVED***
			<fieldset***REMOVED***			
					<div class="control-group" id="birthDate"***REMOVED***
						<label class="control-label"***REMOVED***Birth Date</label***REMOVED***
						<div class="controls"***REMOVED***
							<form:input path="birthDate"  /***REMOVED***
						</div***REMOVED***
					</div***REMOVED***
					
				</fieldset***REMOVED***	
			</form:form***REMOVED***	
  	</div***REMOVED***
</body***REMOVED***

</html***REMOVED***
