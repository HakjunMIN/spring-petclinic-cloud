# Distributed version of the Spring PetClinic Sample Application built with Spring Cloud [![Build Status](https://travis-ci.org/spring-petclinic/spring-petclinic-angular1.svg?branch=master)](https://travis-ci.org/spring-projects/spring-petclinic/)

## Understanding the Spring Petclinic application with a few diagrams
<a href="https://speakerdeck.com/michaelisvy/spring-petclinic-sample-application">See the presentation here</a>

You can then access petclinic here: http://localhost:8080/

<img width="782" alt="springboot-petclinic" src="https://cloud.githubusercontent.com/assets/838318/19653851/61c1986a-9a16-11e6-8b94-03fd7f775bb3.png">

## In case you find a bug/suggested improvement for Spring Petclinic
Our issue tracker is available here: https://github.com/spring-petclinic/spring-petclinic-microservices/issues

## Database configuration

In its default configuration, Petclinic uses an in-memory database (HSQLDB) which
gets populated at startup with data. A similar setup is provided for MySql in case a persistent database configuration is needed.
Note that whenever the database type is changed, the data-access.properties file needs to be updated and the mysql-connector-java artifact from the pom.xml needs to be uncommented.

You may start a MySql database with docker:

```
docker run -e MYSQL_ROOT_PASSWORD=petclinic -e MYSQL_DATABASE=petclinic -p 3306:3306 mysql:5.7.8
```

## Working with Petclinic in Eclipse/STS

### prerequisites
The following items should be installed in your system:
* Maven 3 (http://www.sonatype.com/books/mvnref-book/reference/installation.html)
* git command line tool (https://help.github.com/articles/set-up-git)
* Eclipse with the m2e plugin (m2e is installed by default when using the STS (http://www.springsource.org/sts) distribution of Eclipse)

Note: when m2e is available, there is an m2 icon in Help -> About dialog.
If m2e is not there, just follow the install process here: http://eclipse.org/m2e/download/


### Steps:

1) In the command line
```
git clone https://github.com/spring-petclinic/spring-petclinic-microservices.git
```
2) Inside Eclipse
```
File -> Import -> Maven -> Existing Maven project
```

## Client-side Architecture

Compared to the [standard Petclinic based on JSP pages](https://github.com/spring-projects/spring-petclinic), 
this SpringBoot AngularJS Petclinic is splitted in 2 modules - a client module and a server module:
* springboot-petclinic-client : static resources (images, fonts, style, angular JS code) packaged as a webjar.
* springboot-petclinic-server : Spring MVC REST API and an index.html template


## Looking for something in particular?

<table>
  <tr>
    <th width="300px">Spring Boot Configuration</th><th width="300px"></th>
  </tr>
  <tr>
    <td>The Main Class</td>
    <td><a href="/springboot-petclinic-server/src/main/java/org/springframework/samples/petclinic/application/PetClinicApplication.java">PetClinicApplication.java</a></td>
  </tr>
  <tr>
    <td>Properties Files</td>
    <td>
      <a href="/springboot-petclinic-server/src/main/resources/application.properties">application.properties</a>
      <a href="/springboot-petclinic-server/src/main/resources/application-dev.properties">application-dev.properties</a>
      <a href="/springboot-petclinic-server/src/main/resources/application-prod.properties">application-prod.properties</a>
    </td>
  </tr>
  <tr>
    <td>Caching</td>
    <td>Use JCache with EhCache <a href="/springboot-petclinic-server/src/main/java/org/springframework/samples/petclinic/config/CacheConfig.java">CacheConfig.java</a> <a href="/src/main/resources/ehcache.xml">ehcache.xml</a></td>
  </tr>
    <tr>
      <td>Homepage</td>
      <td>Map root context to the index.html template <a href="/springboot-petclinic-server/src/main/java/org/springframework/samples/petclinic/config/WebConfig.java">WebConfig.java</a> <a href="/src/main/resources/ehcache.xml">ehcache.xml</a></td>
    </tr>
</table>


<table>
  <tr>
    <th width="300px">Front-end module</th><th width="300px">Files</th>
  </tr>
  <tr>
      <td>Node and NPM</td>
      <td>
        <a href="/springboot-petclinic-client/pom.xml">The frontend-maven-plugin plugin downloads/installs Node and NPM locally then runs Bower and Gulp</a> 
      </td>
  </tr>
  <tr>
      <td>Bower</td>
      <td>
        <a href="/springboot-petclinic-client/bower.json">JavaScript libraries are defined by the manifest file bower.json</a>
      </td>
  </tr>
  <tr>
      <td>Gulp</td>
      <td>
        <a href="/springboot-petclinic-client/gulpfile.js">Tasks automated by Gulp: minify CSS and JS, generate CSS from LESS, copy other static resources</a> 
      </td>
  </tr>
    <tr>
        <td>AngularJS</td>
        <td>
          <a href="/springboot-petclinic-client/scripts/">app.js, controllers and templates</a> 
        </td>
    </tr>
</table>



## Interaction with other open source projects

One of the best parts about working on the Spring Petclinic application is that we have the opportunity to work in direct contact with many Open Source projects. We found some bugs/suggested improvements on various topics such as Spring, Spring Data, Bean Validation and even Eclipse! In many cases, they've been fixed/implemented in just a few days.
Here is a list of them:

<table>
  <tr>
    <th width="300px">Name</th>
    <th width="300px"> Issue </th>
  </tr>
  <tr>
    <td>Bean Validation / Hibernate Validator: simplify Maven dependencies and backward compatibility</td>
    <td>
      <a href="https://hibernate.atlassian.net/browse/HV-790"> HV-790</a> and <a href="https://hibernate.atlassian.net/browse/HV-792"> HV-792</a>
      </td>
  </tr>
  <tr>
    <td>Spring Data: provide more flexibility when working with JPQL queries</td>
    <td>
      <a href="https://jira.springsource.org/browse/DATAJPA-292"> DATAJPA-292</a>
      </td>
  </tr>    
</table>


# Contributing

The [issue tracker](https://github.com/spring-petclinic/spring-petclinic-microservices/issues) is the preferred channel for bug reports, features requests and submitting pull requests.

For pull requests, editor preferences are available in the [editor config](https://github.com/spring-projects/spring-petclinic/blob/master/.editorconfig) for easy use in common text editors. Read more and download plugins at <http://editorconfig.org>.

