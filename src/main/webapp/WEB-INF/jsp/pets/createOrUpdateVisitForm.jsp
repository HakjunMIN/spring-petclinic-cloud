<!DOCTYPE html***REMOVED*** 

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %***REMOVED***
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %***REMOVED***
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %***REMOVED***
<%@ taglib prefix="joda" uri="http://www.joda.org/joda/time/tags" %***REMOVED***
<%@ taglib prefix="petclinic" tagdir="/WEB-INF/tags" %***REMOVED***


<html lang="en"***REMOVED***

<jsp:include page="../fragments/staticFiles.jsp"/***REMOVED***


<body***REMOVED***
<script***REMOVED***
    $(function () {
        $("#date").datepicker({ dateFormat: 'yy/mm/dd'***REMOVED***);
    ***REMOVED***);
</script***REMOVED***
<div class="container"***REMOVED***
    <jsp:include page="../fragments/bodyHeader.jsp"/***REMOVED***
    <h2***REMOVED***<c:if test="${visit['new']***REMOVED***"***REMOVED***New </c:if***REMOVED***Visit</h2***REMOVED***

    <b***REMOVED***Pet</b***REMOVED***
    <table class="table table-striped"***REMOVED***
        <thead***REMOVED***
        <tr***REMOVED***
            <th***REMOVED***Name</th***REMOVED***
            <th***REMOVED***Birth Date</th***REMOVED***
            <th***REMOVED***Type</th***REMOVED***
            <th***REMOVED***Owner</th***REMOVED***
        </tr***REMOVED***
        </thead***REMOVED***
        <tr***REMOVED***
            <td***REMOVED***<c:out value="${visit.pet.name***REMOVED***"/***REMOVED***</td***REMOVED***
            <td***REMOVED***<joda:format value="${visit.pet.birthDate***REMOVED***" pattern="yyyy/MM/dd"/***REMOVED***</td***REMOVED***
            <td***REMOVED***<c:out value="${visit.pet.type.name***REMOVED***"/***REMOVED***</td***REMOVED***
            <td***REMOVED***<c:out value="${visit.pet.owner.firstName***REMOVED*** ${visit.pet.owner.lastName***REMOVED***"/***REMOVED***</td***REMOVED***
        </tr***REMOVED***
    </table***REMOVED***

    <form:form modelAttribute="visit"***REMOVED***
    
        <petclinic:inputField label="date" name="date" /***REMOVED***
        <petclinic:inputField label="description" name="description" /***REMOVED***
        
        <div class="form-actions"***REMOVED***
            <input type="hidden" name="petId" value="${visit.pet.id***REMOVED***"/***REMOVED***
            <button type="submit"***REMOVED***Add Visit</button***REMOVED***
        </div***REMOVED***
    </form:form***REMOVED***

    <br/***REMOVED***
    <b***REMOVED***Previous Visits</b***REMOVED***
    <table style="width: 333px;"***REMOVED***
        <tr***REMOVED***
            <th***REMOVED***Date</th***REMOVED***
            <th***REMOVED***Description</th***REMOVED***
        </tr***REMOVED***
        <c:forEach var="visit" items="${visit.pet.visits***REMOVED***"***REMOVED***
            <c:if test="${!visit['new']***REMOVED***"***REMOVED***
                <tr***REMOVED***
                    <td***REMOVED***<joda:format value="${visit.date***REMOVED***" pattern="yyyy/MM/dd"/***REMOVED***</td***REMOVED***
                    <td***REMOVED***<c:out value="${visit.description***REMOVED***"/***REMOVED***</td***REMOVED***
                </tr***REMOVED***
            </c:if***REMOVED***
        </c:forEach***REMOVED***
    </table***REMOVED***

</div***REMOVED***
<jsp:include page="../fragments/footer.jsp"/***REMOVED***
</body***REMOVED***

</html***REMOVED***
