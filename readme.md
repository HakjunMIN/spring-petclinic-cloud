# Spring Boot version of the Spring PetClinic Sample Application [![Build Status](https://travis-ci.org/spring-petclinic/spring-petclinic-angular1.svg?branch=master)](https://travis-ci.org/spring-projects/spring-petclinic/)

## Understanding the Spring Petclinic application with a few diagrams
<a href="https://speakerdeck.com/michaelisvy/spring-petclinic-sample-application"***REMOVED***See the presentation here</a***REMOVED***

## Running petclinic locally
***REMOVED***
	git clone https://github.com/spring-projects/spring-petclinic.git
	cd spring-petclinic
	git checkout angularjs
	./mvnw clean install
	cd spring-petclinic-server
	./mvnw spring-boot:run
***REMOVED***

You can then access petclinic here: http://localhost:8080/

<img width="782" alt="springboot-petclinic" src="https://cloud.githubusercontent.com/assets/838318/19653851/61c1986a-9a16-11e6-8b94-03fd7f775bb3.png"***REMOVED***

## In case you find a bug/suggested improvement for Spring Petclinic
Our issue tracker is available here: https://github.com/spring-projects/spring-petclinic/issues

## Database configuration

In its default configuration, Petclinic uses an in-memory database (HSQLDB) which
gets populated at startup with data. A similar setup is provided for MySql in case a persistent database configuration is needed.
Note that whenever the database type is changed, the data-access.properties file needs to be updated and the mysql-connector-java artifact from the pom.xml needs to be uncommented.

You may start a MySql database with docker:

***REMOVED***
docker run -e MYSQL_ROOT_PASSWORD=petclinic -e MYSQL_DATABASE=petclinic -p 3306:3306 mysql:5.7.8
***REMOVED***

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
git clone https://github.com/spring-projects/spring-petclinic.git
***REMOVED***
2) Inside Eclipse
***REMOVED***
File -***REMOVED*** Import -***REMOVED*** Maven -***REMOVED*** Existing Maven project
***REMOVED***

## Client-side Architecture

Compared to the [standard Petclinic based on JSP pages](https://github.com/spring-projects/spring-petclinic), 
this SpringBoot AngularJS Petclinic is splitted in 2 modules - a client module and a server module:
* springboot-petclinic-client : static resources (images, fonts, style, angular JS code) packaged as a webjar.
* springboot-petclinic-server : Spring MVC REST API and an index.html template


## Looking for something in particular?

<table***REMOVED***
  <tr***REMOVED***
    <th width="300px"***REMOVED***Spring Boot Configuration</th***REMOVED***<th width="300px"***REMOVED***</th***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***The Main Class</td***REMOVED***
    <td***REMOVED***<a href="/springboot-petclinic-server/src/main/java/org/springframework/samples/petclinic/application/PetClinicApplication.java"***REMOVED***PetClinicApplication.java</a***REMOVED***</td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***Properties Files</td***REMOVED***
    <td***REMOVED***
      <a href="/springboot-petclinic-server/src/main/resources/application.properties"***REMOVED***application.properties</a***REMOVED***
      <a href="/springboot-petclinic-server/src/main/resources/application-dev.properties"***REMOVED***application-dev.properties</a***REMOVED***
      <a href="/springboot-petclinic-server/src/main/resources/application-prod.properties"***REMOVED***application-prod.properties</a***REMOVED***
    </td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
    <td***REMOVED***Caching</td***REMOVED***
    <td***REMOVED***Use JCache with EhCache <a href="/springboot-petclinic-server/src/main/java/org/springframework/samples/petclinic/config/CacheConfig.java"***REMOVED***CacheConfig.java</a***REMOVED*** <a href="/src/main/resources/ehcache.xml"***REMOVED***ehcache.xml</a***REMOVED***</td***REMOVED***
  </tr***REMOVED***
    <tr***REMOVED***
      <td***REMOVED***Homepage</td***REMOVED***
      <td***REMOVED***Map root context to the index.html template <a href="/springboot-petclinic-server/src/main/java/org/springframework/samples/petclinic/config/WebConfig.java"***REMOVED***WebConfig.java</a***REMOVED*** <a href="/src/main/resources/ehcache.xml"***REMOVED***ehcache.xml</a***REMOVED***</td***REMOVED***
    </tr***REMOVED***
</table***REMOVED***


<table***REMOVED***
  <tr***REMOVED***
    <th width="300px"***REMOVED***Front-end module</th***REMOVED***<th width="300px"***REMOVED***Files</th***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
      <td***REMOVED***Node and NPM</td***REMOVED***
      <td***REMOVED***
        <a href="/springboot-petclinic-client/pom.xml"***REMOVED***The frontend-maven-plugin plugin downloads/installs Node and NPM locally then runs Bower and Gulp</a***REMOVED*** 
      </td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
      <td***REMOVED***Bower</td***REMOVED***
      <td***REMOVED***
        <a href="/springboot-petclinic-client/bower.json"***REMOVED***JavaScript libraries are defined by the manifest file bower.json</a***REMOVED***
      </td***REMOVED***
  </tr***REMOVED***
  <tr***REMOVED***
      <td***REMOVED***Gulp</td***REMOVED***
      <td***REMOVED***
        <a href="/springboot-petclinic-client/gulpfile.js"***REMOVED***Tasks automated by Gulp: minify CSS and JS, generate CSS from LESS, copy other static resources</a***REMOVED*** 
      </td***REMOVED***
  </tr***REMOVED***
    <tr***REMOVED***
        <td***REMOVED***AngularJS</td***REMOVED***
        <td***REMOVED***
          <a href="/springboot-petclinic-client/scripts/"***REMOVED***app.js, controllers and templates</a***REMOVED*** 
        </td***REMOVED***
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
</table***REMOVED***


# Contributing

The [issue tracker](https://github.com/spring-projects/spring-petclinic/issues) is the preferred channel for bug reports, features requests and submitting pull requests.

For pull requests, editor preferences are available in the [editor config](https://github.com/spring-projects/spring-petclinic/blob/master/.editorconfig) for easy use in common text editors. Read more and download plugins at <http://editorconfig.org***REMOVED***.

