<!DOCTYPE html***REMOVED*** 

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %***REMOVED***
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %***REMOVED***
<%@ taglib prefix="petclinic" tagdir="/WEB-INF/tags" %***REMOVED***


<html lang="en"***REMOVED***

<jsp:include page="../fragments/headTag.jsp"/***REMOVED***
<body***REMOVED***

<script***REMOVED***
    $(function () {
        $("#birthDate").datepicker({ dateFormat: 'yy/mm/dd'***REMOVED***);
    ***REMOVED***);
</script***REMOVED***
<div class="container"***REMOVED***
    <jsp:include page="../fragments/bodyHeader.jsp"/***REMOVED***
    <c:choose***REMOVED***
        <c:when test="${pet['new']***REMOVED***"***REMOVED***
            <c:set var="method" value="post"/***REMOVED***
        </c:when***REMOVED***
        <c:otherwise***REMOVED***
            <c:set var="method" value="put"/***REMOVED***
        </c:otherwise***REMOVED***
    </c:choose***REMOVED***

    <h2***REMOVED***
        <c:if test="${pet['new']***REMOVED***"***REMOVED***New </c:if***REMOVED***
        Pet
    </h2***REMOVED***

    <form:form modelAttribute="pet" method="${method***REMOVED***"
               class="form-horizontal"***REMOVED***
        <div class="control-group" id="owner"***REMOVED***
            <label class="control-label"***REMOVED***Owner </label***REMOVED***

            <c:out value="${pet.owner.firstName***REMOVED*** ${pet.owner.lastName***REMOVED***"/***REMOVED***
        </div***REMOVED***
        <petclinic:inputField label="Name" name="name"/***REMOVED***
        <petclinic:inputField label="Birth Date" name="birthDate"/***REMOVED***
        <div class="control-group"***REMOVED***
            <label class="control-label"***REMOVED***Type </label***REMOVED***
            <form:select path="type" items="${types***REMOVED***" size="5"/***REMOVED***
        </div***REMOVED***
        <div class="form-actions"***REMOVED***
            <c:choose***REMOVED***
                <c:when test="${pet['new']***REMOVED***"***REMOVED***
                    <button type="submit"***REMOVED***Add Pet</button***REMOVED***
                </c:when***REMOVED***
                <c:otherwise***REMOVED***
                    <button type="submit"***REMOVED***Update Pet</button***REMOVED***
                </c:otherwise***REMOVED***
            </c:choose***REMOVED***
        </div***REMOVED***
    </form:form***REMOVED***
    <c:if test="${!pet['new']***REMOVED***"***REMOVED***
    </c:if***REMOVED***
    <jsp:include page="../fragments/footer.jsp"/***REMOVED***
</div***REMOVED***
</body***REMOVED***

</html***REMOVED***
