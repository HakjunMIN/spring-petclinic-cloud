<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %***REMOVED***
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %***REMOVED***


<html lang="en"***REMOVED***


<jsp:include page="../fragments/headTag.jsp"/***REMOVED***

<body***REMOVED***
<div class="container"***REMOVED***
    <jsp:include page="../fragments/bodyHeader.jsp"/***REMOVED***

    <h2***REMOVED***Veterinarians</h2***REMOVED***

    <table class="table table-stripped" style="width:600px;"***REMOVED***
        <thead***REMOVED***
        <tr***REMOVED***
            <th***REMOVED***Name</th***REMOVED***
            <th***REMOVED***Specialties</th***REMOVED***
        </tr***REMOVED***
        </thead***REMOVED***
        <tbody***REMOVED***
        <c:forEach var="vet" items="${vets.vetList***REMOVED***"***REMOVED***
            <tr***REMOVED***
                <td***REMOVED***<c:out value="${vet.firstName***REMOVED*** ${vet.lastName***REMOVED***"/***REMOVED***</td***REMOVED***
                <td***REMOVED***
                    <c:forEach var="specialty" items="${vet.specialties***REMOVED***"***REMOVED***
                        <c:out value="${specialty.name***REMOVED***"/***REMOVED***
                    </c:forEach***REMOVED***
                    <c:if test="${vet.nrOfSpecialties == 0***REMOVED***"***REMOVED***none</c:if***REMOVED***
                </td***REMOVED***
            </tr***REMOVED***
        </c:forEach***REMOVED***
        </tbody***REMOVED***
    </table***REMOVED***
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
