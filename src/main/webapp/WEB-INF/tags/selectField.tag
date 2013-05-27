<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %***REMOVED***
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %***REMOVED***
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %***REMOVED***
<%@ attribute name="name" required="true" rtexprvalue="true"
              description="Name of corresponding property in bean object" %***REMOVED***
<%@ attribute name="label" required="true" rtexprvalue="true"
              description="Label appears in red color if input is considered as invalid after submission" %***REMOVED***
<%@ attribute name="names" required="true" rtexprvalue="true" type="java.util.List"
              description="Names in the list" %***REMOVED***
<%@ attribute name="size" required="true" rtexprvalue="true"
              description="Size of Select" %***REMOVED***

<***REMOVED***bind path="${name***REMOVED***"***REMOVED***
    <c:set var="cssGroup" value="control-group ${status.error ? 'error' : '' ***REMOVED***"/***REMOVED***
    <div class="${cssGroup***REMOVED***"***REMOVED***
        <label class="control-label"***REMOVED***${label***REMOVED***</label***REMOVED***

        <div class="controls"***REMOVED***
            <form:select path="${name***REMOVED***" items="${names***REMOVED***" size="${size***REMOVED***"/***REMOVED***
            <span class="help-inline"***REMOVED***${status.errorMessage***REMOVED***</span***REMOVED***
        </div***REMOVED***
    </div***REMOVED***
</***REMOVED***bind***REMOVED***