package org.springframework.samples.petclinic.repository.jpa;

import org.junit.runner.RunWith;
import org.springframework.samples.petclinic.repository.AbstractVetRepositoryTests;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * <p***REMOVED*** Integration tests for the {@link JdbcClinicImpl***REMOVED*** implementation. </p***REMOVED*** <p***REMOVED*** </p***REMOVED***
 *
 * @author Thomas Risberg
 * @author Michael Isvy
 */
@ContextConfiguration(locations = {"classpath:spring/business-config.xml"***REMOVED***)
@RunWith(SpringJUnit4ClassRunner.class)
@ActiveProfiles("jpa")
public class JpaVetRepositoryImplTests extends AbstractVetRepositoryTests {


***REMOVED***
