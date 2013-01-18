package org.springframework.samples.petclinic.springdatajpa;

import org.junit.runner.RunWith;
import org.springframework.samples.petclinic.AbstractVisitRepositoryTests;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * <p***REMOVED***
 * Integration tests for the {@link JdbcClinicImpl***REMOVED*** implementation.
 * </p***REMOVED***
 * <p***REMOVED***
 * </p***REMOVED***
 *
 * @author Thomas Risberg
 * @author Michael Isvy 
 */
@ContextConfiguration(locations={"classpath:spring/applicationContext-dao.xml"***REMOVED***)
@RunWith(SpringJUnit4ClassRunner.class)
@DirtiesContext
@ActiveProfiles({"jpa","spring-data-jpa"***REMOVED***)
public class JpaVisitRepositoryImplTests extends AbstractVisitRepositoryTests {
	
	

***REMOVED***
