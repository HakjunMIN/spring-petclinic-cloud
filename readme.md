# Spring PetClinic Sample Application

## What does it look like?
spring-petclinic has been deployed here on cloudfoundry: http://spring-petclinic.cloudfoundry.com/

## Running petclinic locally
***REMOVED***
git clone https://github.com/SpringSource/spring-petclinic.git
mvn tomcat7:run
***REMOVED***
You can then access petclinic here: http://localhost:9966/petclinic/

## Working with Petclinic in Eclipse/STS

### prerequisites
The following items should be installed in your system:
* Maven 3 (http://www.sonatype.com/books/mvnref-book/reference/installation.html)
* git command line tool (https://help.github.com/articles/set-up-git)
* Eclipse with the m2e plugin (m2e is installed by default when using the STS (http://www.springsource.org/sts) distribution of Eclipse)

Note: when m2e is available, there is an m2 icon in Help -***REMOVED*** About dialog.
If m2e is not there, just follow the install process here: http://eclipse.org/m2e/download/


### Steps:

In the command line
***REMOVED***
git clone https://github.com/SpringSource/spring-petclinic.git
***REMOVED***
Inside Eclipse: 
***REMOVED***
File -***REMOVED*** Import -***REMOVED*** Maven -***REMOVED*** Existing Maven project
***REMOVED***


## Looking for something in particular?

<table***REMOVED***
  <tr***REMOVED***
    <th***REMOVED***Web layer</th***REMOVED***<th***REMOVED***Files</th***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***Spring MVC- Atom integration</td***REMOVED***
    <td***REMOVED***
      <a href="/SpringSource/spring-petclinic/blob/master/src/main/java/org/springframework/samples/petclinic/web/VisitsAtomView.java"***REMOVED***VisitsAtomView</a***REMOVED***
      <a href="/SpringSource/spring-petclinic/blob/master/src/main/webapp/WEB-INF/mvc-view-config.xml"***REMOVED***mvc-view-config.xml</a***REMOVED***
    </td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***Spring MVC - XML integration</td***REMOVED***
    <td***REMOVED***<a href="/SpringSource/spring-petclinic/blob/master/src/main/webapp/WEB-INF/mvc-view-config.xml"***REMOVED***mvc-view-config.xml</a***REMOVED***</td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***Spring MVC Test Framework</td***REMOVED***
    <td***REMOVED***<a href="/SpringSource/spring-petclinic/blob/master/src/test/java/org/springframework/samples/petclinic/web/VisitsAtomViewTest.java"***REMOVED***VisitsAtomViewTest.java</a***REMOVED***</td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***JSP custom tags</td***REMOVED***
    <td***REMOVED***
      <a href="/SpringSource/spring-petclinic/tree/master/src/main/webapp/WEB-INF/tags"***REMOVED***WEB-INF/tags</a***REMOVED***</td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***webjars</td***REMOVED***
    <td***REMOVED***
      <a href="/SpringSource/spring-petclinic/tree/master/pom.xml#L171"***REMOVED***webjars declaration inside pom.xml</a***REMOVED*** <br /***REMOVED***
      <a href="/SpringSource/spring-petclinic/blob/master/src/main/webapp/WEB-INF/mvc-core-config.xml#L24"***REMOVED***Resource mapping in Spring configuration</a***REMOVED*** <br /***REMOVED***
      <a href="/SpringSource/spring-petclinic/blob/master/src/main/webapp/WEB-INF/jsp/fragments/headTag.jsp#L12"***REMOVED***sample usage in JSP</a***REMOVED***</td***REMOVED***
    </td***REMOVED***
  </tr***REMOVED***
</table***REMOVED***
