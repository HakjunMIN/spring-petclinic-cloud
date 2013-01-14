package org.springframework.samples.petclinic.jdbc;

import org.junit.runner.RunWith;
import org.springframework.samples.petclinic.AbstractClinicTests;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * <p***REMOVED***
 * Integration tests for the {@link JdbcClinic***REMOVED*** implementation.
 * </p***REMOVED***
 * <p***REMOVED***
 * "JdbcClinicTests-context.xml" determines the actual beans to test.
 * </p***REMOVED***
 *
 * @author Thomas Risberg
 */
@ContextConfiguration(locations={"classpath:spring/applicationContext-jdbc.xml"***REMOVED***)
@RunWith(SpringJUnit4ClassRunner.class)
@DirtiesContext
public class JdbcClinicTests extends AbstractClinicTests {
	
	

***REMOVED***
