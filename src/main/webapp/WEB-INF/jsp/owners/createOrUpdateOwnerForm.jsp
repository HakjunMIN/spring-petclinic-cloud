<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %***REMOVED***
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %***REMOVED***
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %***REMOVED***
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %***REMOVED***


<html lang="en"***REMOVED***

<jsp:include page="../fragments/headTag.jsp"/***REMOVED***

<body***REMOVED***
  	<div class="container"***REMOVED***
		<jsp:include page="../fragments/bodyHeader.jsp"/***REMOVED***
		<c:choose***REMOVED***
			<c:when test="${owner['new']***REMOVED***"***REMOVED***<c:set var="method" value="post"/***REMOVED***</c:when***REMOVED***
			<c:otherwise***REMOVED***<c:set var="method" value="put"/***REMOVED***</c:otherwise***REMOVED***
		</c:choose***REMOVED***
		
		<h2***REMOVED***
			<c:if test="${owner['new']***REMOVED***"***REMOVED***New </c:if***REMOVED*** Owner
		</h2***REMOVED***
		<form:form modelAttribute="owner" method="${method***REMOVED***" class="form-horizontal" id="add-owner-form"***REMOVED***
			<fieldset***REMOVED***
					<div class="control-group" id="firstName"***REMOVED***
						<label class="control-label"***REMOVED***First Name </label***REMOVED***
						<div class="controls"***REMOVED***
							<form:input path="firstName" /***REMOVED***
							<span class="help-inline"***REMOVED***<form:errors path="firstName" /***REMOVED***</span***REMOVED***
						</div***REMOVED***
					</div***REMOVED***
					<div class="control-group" id="lastName"***REMOVED***
						<label class="control-label"***REMOVED***Last Name </label***REMOVED***
						<div class="controls"***REMOVED***
							<form:input path="lastName" /***REMOVED***
							<span class="help-inline"***REMOVED***<form:errors path="lastName" /***REMOVED***</span***REMOVED***
						</div***REMOVED***
					</div***REMOVED***
					<div class="control-group" id="address"***REMOVED***
						<label class="control-label"***REMOVED***Address </label***REMOVED***
						<div class="controls"***REMOVED***
							<form:input path="address" /***REMOVED***
							<span class="help-inline"***REMOVED***<form:errors path="address" /***REMOVED***</span***REMOVED***
						</div***REMOVED***
					</div***REMOVED***
					<div class="control-group" id="city"***REMOVED***
						<label class="control-label"***REMOVED***City </label***REMOVED***
						<div class="controls"***REMOVED***
							<form:input path="city" /***REMOVED***
							<span class="help-inline"***REMOVED***<form:errors path="city" /***REMOVED***</span***REMOVED***
						</div***REMOVED***
					</div***REMOVED***
					<div class="control-group" id="telephone"***REMOVED***
						<label class="control-label"***REMOVED***Telephone </label***REMOVED***
						<div class="controls"***REMOVED***
							<form:input path="telephone" /***REMOVED***
							<span class="help-inline"***REMOVED***<form:errors path="telephone" /***REMOVED***</span***REMOVED***
						</div***REMOVED***
					</div***REMOVED***
					<div class="form-actions"***REMOVED***
						<c:choose***REMOVED***
				          <c:when test="${owner['new']***REMOVED***"***REMOVED***
				            <button type="submit"***REMOVED***Add Owner</button***REMOVED***
				          </c:when***REMOVED***
				          <c:otherwise***REMOVED***
				            <button type="submit"***REMOVED***Update Owner</button***REMOVED***
				          </c:otherwise***REMOVED***
				        </c:choose***REMOVED***
					</div***REMOVED***
				</fieldset***REMOVED***
		</form:form***REMOVED***
  	</div***REMOVED***
	<jsp:include page="../fragments/footer.jsp"/***REMOVED***
</body***REMOVED***

</html***REMOVED***
