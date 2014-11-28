<!DOCTYPE html***REMOVED*** 

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %***REMOVED***
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %***REMOVED***
<%@ taglib prefix="datatables" uri="http://github.com/dandelion/datatables" %***REMOVED***

<html lang="en"***REMOVED***


<jsp:include page="../fragments/staticFiles.jsp"/***REMOVED***

<body***REMOVED***
<div class="container"***REMOVED***
    <jsp:include page="../fragments/bodyHeader.jsp"/***REMOVED***

    <h2***REMOVED***Veterinarians</h2***REMOVED***

    <datatables:table id="vets" data="${vets.vetList***REMOVED***" row="vet" theme="bootstrap2" cssClass="table table-striped" pageable="false" info="false"***REMOVED***
        <datatables:column title="Name"***REMOVED***
            <c:out value="${vet.firstName***REMOVED*** ${vet.lastName***REMOVED***"***REMOVED***</c:out***REMOVED***
        </datatables:column***REMOVED***
        <datatables:column title="Specialties"***REMOVED***
            <c:forEach var="specialty" items="${vet.specialties***REMOVED***"***REMOVED***
                <c:out value="${specialty.name***REMOVED***"/***REMOVED***
            </c:forEach***REMOVED***
            <c:if test="${vet.nrOfSpecialties == 0***REMOVED***"***REMOVED***none</c:if***REMOVED***
        </datatables:column***REMOVED***
    </datatables:table***REMOVED***
    
    <table class="table-buttons"***REMOVED***
        <tr***REMOVED***
            <td***REMOVED***
                <a href="<***REMOVED***url value="/vets.xml" htmlEscape="true" /***REMOVED***"***REMOVED***View as XML</a***REMOVED***
            </td***REMOVED***
            <td***REMOVED***
                <a href="<***REMOVED***url value="/vets.atom" htmlEscape="true" /***REMOVED***"***REMOVED***Subscribe to Atom feed</a***REMOVED***
            </td***REMOVED***
        </tr***REMOVED***
    </table***REMOVED***

    <jsp:include page="../fragments/footer.jsp"/***REMOVED***
</div***REMOVED***
</body***REMOVED***

</html***REMOVED***
