<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %***REMOVED***
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %***REMOVED***


<html lang="en"***REMOVED***

<jsp:include page="../header.jsp"/***REMOVED***

<body***REMOVED***

  	<div class="container"***REMOVED***
		<***REMOVED***url value="/resources/images/banner-graphic.png" var="banner"/***REMOVED***
		<img src="${banner***REMOVED***" /***REMOVED***
		
		<c:choose***REMOVED***
			<c:when test="${pet['new']***REMOVED***"***REMOVED***<c:set var="method" value="post"/***REMOVED***</c:when***REMOVED***
			<c:otherwise***REMOVED***<c:set var="method" value="put"/***REMOVED***</c:otherwise***REMOVED***
		</c:choose***REMOVED***
		
		<h2***REMOVED***<c:if test="${pet['new']***REMOVED***"***REMOVED***New </c:if***REMOVED***Pet</h2***REMOVED***
		
		<b***REMOVED***Owner:</b***REMOVED*** ${pet.owner.firstName***REMOVED*** ${pet.owner.lastName***REMOVED***
		<br/***REMOVED***
		<form:form modelAttribute="pet" method="${method***REMOVED***" class="form-horizontal"***REMOVED***
			<fieldset***REMOVED***
					<div class="control-group" id="name"***REMOVED***
						<label class="control-label"***REMOVED***Name </label***REMOVED***
						<div class="controls"***REMOVED***
							<form:input path="name" /***REMOVED***
							<span class="help-inline"***REMOVED***<form:errors path="name" /***REMOVED***</span***REMOVED***
						</div***REMOVED***
					</div***REMOVED***
					<div class="control-group" id="birthDate"***REMOVED***
						<label class="control-label"***REMOVED***Birth Date </label***REMOVED***
						<div class="controls"***REMOVED***
							<form:input path="birthDate" /***REMOVED***
							<span class="help-inline"***REMOVED***<form:errors path="birthDate" /***REMOVED***</span***REMOVED***
						</div***REMOVED***
					</div***REMOVED***
					<div class="control-group" id="type"***REMOVED***
						<label class="control-label"***REMOVED***Type </label***REMOVED***
						<form:select path="type" items="${types***REMOVED***"/***REMOVED***
					</div***REMOVED***
					<div class="form-actions"***REMOVED***
						<c:choose***REMOVED***
				          <c:when test="${owner['new']***REMOVED***"***REMOVED***
				            <button type="submit"***REMOVED***Add Pet</button***REMOVED***
				          </c:when***REMOVED***
				          <c:otherwise***REMOVED***
				            <button type="submit"***REMOVED***Update Pet</button***REMOVED***
				          </c:otherwise***REMOVED***
				        </c:choose***REMOVED***
					</div***REMOVED***
				</fieldset***REMOVED***	
			</form:form***REMOVED***	
			<c:if test="${!pet['new']***REMOVED***"***REMOVED***
			  <form:form method="delete"***REMOVED***
			    <p class="submit"***REMOVED***<input type="submit" value="Delete Pet"/***REMOVED***</p***REMOVED***
			  </form:form***REMOVED***
			</c:if***REMOVED***    
			<jsp:include page="../footer.jsp"/***REMOVED***
  	</div***REMOVED***
</body***REMOVED***

</html***REMOVED***
