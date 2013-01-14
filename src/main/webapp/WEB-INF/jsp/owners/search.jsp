<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %***REMOVED***
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %***REMOVED***
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %***REMOVED***

<html lang="en"***REMOVED***

<jsp:include page="../header.jsp"/***REMOVED***

<body***REMOVED***

	<div class="container"***REMOVED***
		<***REMOVED***url value="/resources/images/banner-graphic.png" var="banner"/***REMOVED***
		<img src="${banner***REMOVED***" /***REMOVED***

		<h2***REMOVED***Find Owners</h2***REMOVED***
		
		<***REMOVED***url value="/owners" var="formUrl"/***REMOVED***
		<form:form modelAttribute="owner" action="${fn:escapeXml(formUrl)***REMOVED***" method="get" class="form-horizontal"***REMOVED***
					<fieldset***REMOVED***
						<div class="controls"***REMOVED***
							<label class="control-label"***REMOVED***Last name </label***REMOVED***
							<form:input path="lastName" size="30" maxlength="80"/***REMOVED***
							<span class="help-inline"***REMOVED***<form:errors path="*" /***REMOVED***</span***REMOVED***
						</div***REMOVED***				
						<div class="form-actions"***REMOVED***
							<button type="submit"***REMOVED***Find Owner</button***REMOVED***
						</div***REMOVED***
					</fieldset***REMOVED***
		</form:form***REMOVED***
		
		<br/***REMOVED***
		<a href='<***REMOVED***url value="/owners/new" htmlEscape="true"/***REMOVED***'***REMOVED***Add Owner</a***REMOVED***
		
		<jsp:include page="../footer.jsp"/***REMOVED***

  	</div***REMOVED***
</body***REMOVED***

</html***REMOVED***
