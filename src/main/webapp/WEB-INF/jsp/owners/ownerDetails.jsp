<!DOCTYPE html***REMOVED*** 

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %***REMOVED***
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %***REMOVED***
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %***REMOVED***
<%@ taglib prefix="joda" uri="http://www.joda.org/joda/time/tags" %***REMOVED***

<html lang="en"***REMOVED***

<jsp:include page="../fragments/staticFiles.jsp"/***REMOVED***

<body***REMOVED***
<div class="container"***REMOVED***
    <jsp:include page="../fragments/bodyHeader.jsp"/***REMOVED***

    <h2***REMOVED***Owner Information</h2***REMOVED***

    <table class="table table-striped" style="width:600px;"***REMOVED***
        <tr***REMOVED***
            <th***REMOVED***Name</th***REMOVED***
            <td***REMOVED***<b***REMOVED***<c:out value="${owner.firstName***REMOVED*** ${owner.lastName***REMOVED***"/***REMOVED***</b***REMOVED***</td***REMOVED***
        </tr***REMOVED***
        <tr***REMOVED***
            <th***REMOVED***Address</th***REMOVED***
            <td***REMOVED***<c:out value="${owner.address***REMOVED***"/***REMOVED***</td***REMOVED***
        </tr***REMOVED***
        <tr***REMOVED***
            <th***REMOVED***City</th***REMOVED***
            <td***REMOVED***<c:out value="${owner.city***REMOVED***"/***REMOVED***</td***REMOVED***
        </tr***REMOVED***
        <tr***REMOVED***
            <th***REMOVED***Telephone</th***REMOVED***
            <td***REMOVED***<c:out value="${owner.telephone***REMOVED***"/***REMOVED***</td***REMOVED***
        </tr***REMOVED***
         <tr***REMOVED***
            <td***REMOVED*** 
            	<***REMOVED***url value="{ownerId***REMOVED***/edit.html" var="editUrl"***REMOVED***
                    <***REMOVED***param name="ownerId" value="${owner.id***REMOVED***"/***REMOVED***
                </***REMOVED***url***REMOVED***
                <a href="${fn:escapeXml(editUrl)***REMOVED***" class="btn btn-info"***REMOVED***Edit Owner</a***REMOVED***</td***REMOVED***
            <td***REMOVED***
            	<***REMOVED***url value="{ownerId***REMOVED***/pets/new.html" var="addUrl"***REMOVED***
                    <***REMOVED***param name="ownerId" value="${owner.id***REMOVED***"/***REMOVED***
                </***REMOVED***url***REMOVED***
                <a href="${fn:escapeXml(addUrl)***REMOVED***"  class="btn btn-success"***REMOVED***Add New Pet</a***REMOVED***</td***REMOVED***
        </tr***REMOVED***
    </table***REMOVED***

    <h2***REMOVED***Pets and Visits</h2***REMOVED***

    <c:forEach var="pet" items="${owner.pets***REMOVED***"***REMOVED***
        <table class="table" style="width:600px;"***REMOVED***
            <tr***REMOVED***
                <td valign="top" style="width: 120px;"***REMOVED***
                    <dl class="dl-horizontal"***REMOVED***
                        <dt***REMOVED***Name</dt***REMOVED***
                        <dd***REMOVED***<c:out value="${pet.name***REMOVED***"/***REMOVED***</dd***REMOVED***
                        <dt***REMOVED***Birth Date</dt***REMOVED***
                        <dd***REMOVED***<joda:format value="${pet.birthDate***REMOVED***" pattern="yyyy-MM-dd"/***REMOVED***</dd***REMOVED***
                        <dt***REMOVED***Type</dt***REMOVED***
                        <dd***REMOVED***<c:out value="${pet.type.name***REMOVED***"/***REMOVED***</dd***REMOVED***
                    </dl***REMOVED***
                </td***REMOVED***
                <td valign="top"***REMOVED***
                    <table class="table-condensed"***REMOVED***
                        <thead***REMOVED***
                        <tr***REMOVED***
                            <th***REMOVED***Visit Date</th***REMOVED***
                            <th***REMOVED***Description</th***REMOVED***
                        </tr***REMOVED***
                        </thead***REMOVED***
                        <c:forEach var="visit" items="${pet.visits***REMOVED***"***REMOVED***
                            <tr***REMOVED***
                                <td***REMOVED***<joda:format value="${visit.date***REMOVED***" pattern="yyyy-MM-dd"/***REMOVED***</td***REMOVED***
                                <td***REMOVED***<c:out value="${visit.description***REMOVED***"/***REMOVED***</td***REMOVED***
                            </tr***REMOVED***
                        </c:forEach***REMOVED***
                        <tr***REMOVED***
                            <td***REMOVED*** 
                            	<***REMOVED***url value="/owners/{ownerId***REMOVED***/pets/{petId***REMOVED***/edit" var="petUrl"***REMOVED***
			                        <***REMOVED***param name="ownerId" value="${owner.id***REMOVED***"/***REMOVED***
			                        <***REMOVED***param name="petId" value="${pet.id***REMOVED***"/***REMOVED***
			                    </***REMOVED***url***REMOVED***
			                    <a href="${fn:escapeXml(petUrl)***REMOVED***"***REMOVED***Edit Pet</a***REMOVED***
			                </td***REMOVED***
                            <td***REMOVED***
			                    <***REMOVED***url value="/owners/{ownerId***REMOVED***/pets/{petId***REMOVED***/visits/new" var="visitUrl"***REMOVED***
			                        <***REMOVED***param name="ownerId" value="${owner.id***REMOVED***"/***REMOVED***
			                        <***REMOVED***param name="petId" value="${pet.id***REMOVED***"/***REMOVED***
			                    </***REMOVED***url***REMOVED***
			                    <a href="${fn:escapeXml(visitUrl)***REMOVED***"***REMOVED***Add Visit</a***REMOVED***
                            </td***REMOVED***
                       	</tr***REMOVED***
                    </table***REMOVED***
                </td***REMOVED***
            </tr***REMOVED***
        </table***REMOVED***
    </c:forEach***REMOVED***

    <jsp:include page="../fragments/footer.jsp"/***REMOVED***

</div***REMOVED***

</body***REMOVED***

</html***REMOVED***
