<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %***REMOVED***
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %***REMOVED***
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %***REMOVED***


<html lang="en"***REMOVED***

<jsp:include page="../fragments/headTag.jsp"/***REMOVED***

<body***REMOVED***
<div class="container"***REMOVED***
    <jsp:include page="../fragments/bodyHeader.jsp"/***REMOVED***
    <h2***REMOVED***Owners</h2***REMOVED***

    <table class="table table-striped"***REMOVED***
        <thead***REMOVED***
        <tr***REMOVED***
            <th style="width: 150px;"***REMOVED***Name</th***REMOVED***
            <th style="width: 200px;"***REMOVED***Address</th***REMOVED***
            <th***REMOVED***City</th***REMOVED***
            <th***REMOVED***Telephone</th***REMOVED***
            <th style="width: 100px;"***REMOVED***Pets</th***REMOVED***
        </tr***REMOVED***
        </thead***REMOVED***
        <c:forEach var="owner" items="${selections***REMOVED***"***REMOVED***
            <tr***REMOVED***
                <td***REMOVED***
                    <***REMOVED***url value="owners/{ownerId***REMOVED***.html" var="ownerUrl"***REMOVED***
                        <***REMOVED***param name="ownerId" value="${owner.id***REMOVED***"/***REMOVED***
                    </***REMOVED***url***REMOVED***
                    <a href="${fn:escapeXml(ownerUrl)***REMOVED***"***REMOVED***<c:out value="${owner.firstName***REMOVED*** ${owner.lastName***REMOVED***"/***REMOVED***</a***REMOVED***
                </td***REMOVED***
                <td***REMOVED***<c:out value="${owner.address***REMOVED***"/***REMOVED***</td***REMOVED***
                <td***REMOVED***<c:out value="${owner.city***REMOVED***"/***REMOVED***</td***REMOVED***
                <td***REMOVED***<c:out value="${owner.telephone***REMOVED***"/***REMOVED***</td***REMOVED***
                <td***REMOVED***
                    <c:forEach var="pet" items="${owner.pets***REMOVED***"***REMOVED***
                        <c:out value="${pet.name***REMOVED***"/***REMOVED***
                    </c:forEach***REMOVED***
                </td***REMOVED***
            </tr***REMOVED***
        </c:forEach***REMOVED***
    </table***REMOVED***
    <jsp:include page="../fragments/footer.jsp"/***REMOVED***

</div***REMOVED***
</body***REMOVED***

</html***REMOVED***
