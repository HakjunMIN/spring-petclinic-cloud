<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %***REMOVED***
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %***REMOVED***
<%@ page session="false" %***REMOVED***
<html***REMOVED***
<head***REMOVED***
	<title***REMOVED***<tiles:insertAttribute name="title"/***REMOVED***</title***REMOVED***
	<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath***REMOVED***/resources/styles/main.css"/***REMOVED***
</head***REMOVED***
<body id="page-body"***REMOVED***
	<div id="page"***REMOVED***
		<div id="header"***REMOVED***
			<ul id="signin"***REMOVED***
				<c:choose***REMOVED***
					<c:when test="${pageContext.request.userPrincipal != null***REMOVED***"***REMOVED***
						<p***REMOVED***Welcome ${pageContext.request.userPrincipal.name***REMOVED***</p***REMOVED***
						<li***REMOVED***<a href="<c:url value="/account/signout"/***REMOVED***"***REMOVED***Sign Out</a***REMOVED***</li***REMOVED***
					</c:when***REMOVED***
					<c:otherwise***REMOVED***
						<li***REMOVED***<a href="<c:url value="/account/signin"/***REMOVED***"***REMOVED***Sign In</a***REMOVED***</li***REMOVED***				
						<li***REMOVED***<a href="<c:url value="/account/register"/***REMOVED***"***REMOVED***Register</a***REMOVED***</li***REMOVED***				
					</c:otherwise***REMOVED***
				</c:choose***REMOVED***
			</ul***REMOVED***
			<div id="nav"***REMOVED***
				<ul***REMOVED***
					<li***REMOVED***<a href="<c:url value="/"/***REMOVED***"***REMOVED***Home</a***REMOVED***</li***REMOVED***
					<li***REMOVED***<a href="appointments"***REMOVED***Appointments</a***REMOVED***</li***REMOVED***
					<li***REMOVED***<a href="owners"***REMOVED***Owners</a***REMOVED***</li***REMOVED***
					<li***REMOVED***<a href="pets"***REMOVED***Pets</a***REMOVED***</li***REMOVED***
				</ul***REMOVED***
			</div***REMOVED***
		</div***REMOVED***
		<div id="content"***REMOVED***
			<tiles:insertAttribute name="content"/***REMOVED***
		</div***REMOVED***
		<div id="footer"***REMOVED***
			<ul id="legal"***REMOVED***
				<li***REMOVED***Privacy Policy</li***REMOVED***
				<li***REMOVED***Terms of Service</li***REMOVED***
			</ul***REMOVED***	
			<p***REMOVED***(c) 2009 <a href="http://www.springsource.org"***REMOVED***springsource.org</a***REMOVED***</p***REMOVED***
		</div***REMOVED***
	</div***REMOVED***
</body***REMOVED***
</html***REMOVED***