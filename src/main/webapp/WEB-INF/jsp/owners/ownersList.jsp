<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %***REMOVED***
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %***REMOVED***
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %***REMOVED***
<%@ taglib prefix="datatables" uri="http://github.com/dandelion/datatables" %***REMOVED***

<html lang="en"***REMOVED***

<jsp:include page="../fragments/headTag.jsp"/***REMOVED***

<body***REMOVED***
<div class="container"***REMOVED***
    <jsp:include page="../fragments/bodyHeader.jsp"/***REMOVED***
    <h2***REMOVED***Owners</h2***REMOVED***
    
    <datatables:table id="owners" data="${selections***REMOVED***" cdn="true" row="owner" theme="bootstrap2" 
                      cssClass="table table-striped" paginate="false" info="false" export="pdf"***REMOVED***
        <datatables:column title="Name" cssStyle="width: 150px;" display="html"***REMOVED***
            <***REMOVED***url value="owners/{ownerId***REMOVED***.html" var="ownerUrl"***REMOVED***
                <***REMOVED***param name="ownerId" value="${owner.id***REMOVED***"/***REMOVED***
            </***REMOVED***url***REMOVED***
            <a href="${fn:escapeXml(ownerUrl)***REMOVED***"***REMOVED***<c:out value="${owner.firstName***REMOVED*** ${owner.lastName***REMOVED***"/***REMOVED***</a***REMOVED***
        </datatables:column***REMOVED***
        <datatables:column title="Name" display="pdf"***REMOVED***
            <c:out value="${owner.firstName***REMOVED*** ${owner.lastName***REMOVED***"/***REMOVED***
        </datatables:column***REMOVED***
        <datatables:column title="Address" property="address" cssStyle="width: 200px;"/***REMOVED***
        <datatables:column title="City" property="city"/***REMOVED***
        <datatables:column title="Telephone" property="telephone"/***REMOVED***
        <datatables:column title="Pets" cssStyle="width: 100px;"***REMOVED***
            <c:forEach var="pet" items="${owner.pets***REMOVED***"***REMOVED***
                <c:out value="${pet.name***REMOVED***"/***REMOVED***
            </c:forEach***REMOVED***
        </datatables:column***REMOVED***
        <datatables:export type="pdf" cssClass="btn btn-small" /***REMOVED***
    </datatables:table***REMOVED***
    
    <jsp:include page="../fragments/footer.jsp"/***REMOVED***

</div***REMOVED***
</body***REMOVED***

</html***REMOVED***
