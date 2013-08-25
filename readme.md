# Spring PetClinic Sample Application

## Understanding the Spring Petclinic application with a few diagrams
<a href="https://speakerdeck.com/michaelisvy/spring-petclinic-sample-application"***REMOVED***See the presentation here</a***REMOVED***

## Running petclinic locally
***REMOVED***
	git clone https://github.com/SpringSource/spring-petclinic.git
	mvn tomcat7:run
***REMOVED***

You can then access petclinic here: http://localhost:9966/petclinic/

## In case you find a bug/suggested improvement for Spring Petclinic
Our issue tracker is available here: https://github.com/SpringSource/spring-petclinic/issues

## Working with Petclinic in Eclipse/STS

### prerequisites
The following items should be installed in your system:
* Maven 3 (http://www.sonatype.com/books/mvnref-book/reference/installation.html)
* git command line tool (https://help.github.com/articles/set-up-git)
* Eclipse with the m2e plugin (m2e is installed by default when using the STS (http://www.springsource.org/sts) distribution of Eclipse)

Note: when m2e is available, there is an m2 icon in Help -***REMOVED*** About dialog.
If m2e is not there, just follow the install process here: http://eclipse.org/m2e/download/


### Steps:

1) In the command line
***REMOVED***
git clone https://github.com/SpringSource/spring-petclinic.git
***REMOVED***
2) Inside Eclipse
***REMOVED***
File -***REMOVED*** Import -***REMOVED*** Maven -***REMOVED*** Existing Maven project
***REMOVED***


## Looking for something in particular?

<table***REMOVED***
  <tr***REMOVED***
    <th width="300px"***REMOVED***Inside the 'Web' layer</th***REMOVED***<th width="300px"***REMOVED***Files</th***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***Spring MVC- Atom integration</td***REMOVED***
    <td***REMOVED***
      <a href="/src/main/java/org/springframework/samples/petclinic/web/VetsAtomView.java"***REMOVED***VetsAtomView.java</a***REMOVED***
      <a href="/src/main/resources/spring/mvc-view-config.xml"***REMOVED***mvc-view-config.xml</a***REMOVED***
    </td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***Spring MVC - XML integration</td***REMOVED***
    <td***REMOVED***<a href="/src/main/resources/spring/mvc-view-config.xml"***REMOVED***mvc-view-config.xml</a***REMOVED***</td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***Spring MVC - ContentNegotiatingViewResolver</td***REMOVED***
    <td***REMOVED***<a href="/src/main/resources/spring/mvc-view-config.xml"***REMOVED***mvc-view-config.xml</a***REMOVED***</td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***Spring MVC Test Framework</td***REMOVED***
    <td***REMOVED***<a href="/src/test/java/org/springframework/samples/petclinic/web/VisitsViewTest.java"***REMOVED***VisitsViewTest.java</a***REMOVED***</td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***JSP custom tags</td***REMOVED***
    <td***REMOVED***
      <a href="/src/main/webapp/WEB-INF/tags"***REMOVED***WEB-INF/tags</a***REMOVED***
      <a href="/src/main/webapp/WEB-INF/jsp/owners/createOrUpdateOwnerForm.jsp"***REMOVED***createOrUpdateOwnerForm.jsp</a***REMOVED***</td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***webjars</td***REMOVED***
    <td***REMOVED***
      <a href="/pom.xml"***REMOVED***webjars declaration inside pom.xml</a***REMOVED*** <br /***REMOVED***
      <a href="/src/main/resources/spring/mvc-core-config.xml#L24"***REMOVED***Resource mapping in Spring configuration</a***REMOVED*** <br /***REMOVED***
      <a href="/src/main/webapp/WEB-INF/jsp/fragments/headTag.jsp#L12"***REMOVED***sample usage in JSP</a***REMOVED***</td***REMOVED***
    </td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***Dandelion-datatables</td***REMOVED***
    <td***REMOVED***
      <a href="/src/main/webapp/WEB-INF/jsp/owners/ownersList.jsp"***REMOVED***ownersList.jsp</a***REMOVED*** 
      <a href="/src/main/webapp/WEB-INF/jsp/vets/vetList.jsp"***REMOVED***vetList.jsp</a***REMOVED*** 
      <a href="/src/main/webapp/WEB-INF/web.xml"***REMOVED***web.xml</a***REMOVED*** 
   </td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***Thymeleaf branch</td***REMOVED***
    <td***REMOVED***
      <a href="http://www.thymeleaf.org/petclinic.html"***REMOVED***See here</a***REMOVED***</td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***Branch using GemFire and Spring Data GemFire instead of ehcache (thanks Bijoy Choudhury)</td***REMOVED***
    <td***REMOVED***
      <a href="https://github.com/bijoych/spring-petclinic-gemfire"***REMOVED***See here</a***REMOVED***</td***REMOVED***
  </tr***REMOVED***
</table***REMOVED***

<table***REMOVED***
  <tr***REMOVED***
    <th width="300px"***REMOVED***'Service' and 'Repository' layers</th***REMOVED***<th width="300px"***REMOVED***Files</th***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***Transactions</td***REMOVED***
    <td***REMOVED***
      <a href="/src/main/resources/spring/business-config.xml"***REMOVED***business-config.xml</a***REMOVED***
       <a href="/src/main/java/org/springframework/samples/petclinic/service/ClinicServiceImpl.java"***REMOVED***ClinicServiceImpl.java</a***REMOVED***
    </td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***Cache</td***REMOVED***
      <td***REMOVED***
      <a href="/src/main/resources/spring/tools-config.xml"***REMOVED***tools-config.xml</a***REMOVED***
       <a href="/src/main/java/org/springframework/samples/petclinic/service/ClinicServiceImpl.java"***REMOVED***ClinicServiceImpl.java</a***REMOVED***
    </td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***Bean Profiles</td***REMOVED***
      <td***REMOVED***
      <a href="/src/main/resources/spring/business-config.xml"***REMOVED***business-config.xml</a***REMOVED***
       <a href="/src/test/java/org/springframework/samples/petclinic/service/ClinicServiceJdbcTests.java"***REMOVED***ClinicServiceJdbcTests.java</a***REMOVED***
       <a href="/src/main/webapp/WEB-INF/web.xml"***REMOVED***web.xml</a***REMOVED***
    </td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***JdbcTemplate</td***REMOVED***
    <td***REMOVED***
      <a href="/src/main/resources/spring/business-config.xml"***REMOVED***business-config.xml</a***REMOVED***
      <a href="/src/main/java/org/springframework/samples/petclinic/repository/jdbc"***REMOVED***jdbc folder</a***REMOVED***</td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***JPA</td***REMOVED***
    <td***REMOVED***
      <a href="/src/main/resources/spring/business-config.xml"***REMOVED***business-config.xml</a***REMOVED***
      <a href="/src/main/java/org/springframework/samples/petclinic/repository/jpa"***REMOVED***jpa folder</a***REMOVED***</td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***Spring Data JPA</td***REMOVED***
    <td***REMOVED***
      <a href="/src/main/resources/spring/business-config.xml"***REMOVED***business-config.xml</a***REMOVED***
      <a href="/src/main/java/org/springframework/samples/petclinic/repository/springdatajpa"***REMOVED***springdatajpa folder</a***REMOVED***</td***REMOVED***
  </tr***REMOVED***
</table***REMOVED***

<table***REMOVED***
  <tr***REMOVED***
    <th width="300px"***REMOVED***Others</th***REMOVED***<th width="300px"***REMOVED***Files</th***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***Gradle branch</td***REMOVED***
    <td***REMOVED***
      <a href="https://github.com/whimet/spring-petclinic"***REMOVED***See here</a***REMOVED***</td***REMOVED***
  </tr***REMOVED***
</table***REMOVED***


## Interaction with other open source projects

One of the best parts about working on the Spring Petclinic application is that we have the opportunity to work in direct contact with many Open Source projects. We found some bugs/suggested improvements on various topics such as Spring, Spring Data, Bean Validation and even Eclipse! In many cases, they've been fixed/implemented in just a few days.
Here is a list of them:

<table***REMOVED***
  <tr***REMOVED***
    <th width="300px"***REMOVED***Name</th***REMOVED***
    <th width="300px"***REMOVED*** Issue </th***REMOVED***
  </tr***REMOVED***

  <tr***REMOVED***
    <td***REMOVED***Spring JDBC: simplify usage of NamedParameterJdbcTemplate</td***REMOVED***
    <td***REMOVED*** <a href="https://jira.springsource.org/browse/SPR-10256"***REMOVED*** SPR-10256</a***REMOVED*** and <a href="https://jira.springsource.org/browse/SPR-10257"***REMOVED*** SPR-10257</a***REMOVED*** </td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***Bean Validation / Hibernate Validator: simplify Maven dependencies and backward compatibility</td***REMOVED***
    <td***REMOVED***
      <a href="https://hibernate.atlassian.net/browse/HV-790"***REMOVED*** HV-790</a***REMOVED*** and <a href="https://hibernate.atlassian.net/browse/HV-792"***REMOVED*** HV-792</a***REMOVED***
      </td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***Spring Data: provide more flexibility when working with JPQL queries</td***REMOVED***
    <td***REMOVED***
      <a href="https://jira.springsource.org/browse/DATAJPA-292"***REMOVED*** DATAJPA-292</a***REMOVED***
      </td***REMOVED***
  </tr***REMOVED***  
  <tr***REMOVED***
    <td***REMOVED***Eclipse: validation bug when working with .tag/.tagx files</td***REMOVED***
    <td***REMOVED***
      <a href="https://issuetracker.springsource.com/browse/STS-3294"***REMOVED*** STS-3294</a***REMOVED***
    </td***REMOVED***
  </tr***REMOVED***    
</table***REMOVED***




