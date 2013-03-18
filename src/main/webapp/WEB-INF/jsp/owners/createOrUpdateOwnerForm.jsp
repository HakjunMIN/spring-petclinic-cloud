<!DOCTYPE html***REMOVED*** 

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %***REMOVED***
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %***REMOVED***
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %***REMOVED***
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %***REMOVED***
<%@ taglib prefix="petclinic" tagdir="/WEB-INF/tags" %***REMOVED***


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
        <petclinic:inputField label="First Name" name="firstName"/***REMOVED***
        <petclinic:inputField label="Last Name" name="lastName"/***REMOVED***
        <petclinic:inputField label="Address" name="address"/***REMOVED***
        <petclinic:inputField label="City" name="city"/***REMOVED***
        <petclinic:inputField label="Telephone" name="telephone"/***REMOVED***

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
    </form:form***REMOVED***
</div***REMOVED***
<jsp:include page="../fragments/footer.jsp"/***REMOVED***
</body***REMOVED***

</html***REMOVED***
