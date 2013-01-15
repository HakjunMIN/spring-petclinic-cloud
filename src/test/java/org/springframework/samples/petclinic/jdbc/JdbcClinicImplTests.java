package org.springframework.samples.petclinic.jdbc;

import org.junit.runner.RunWith;
import org.springframework.samples.petclinic.AbstractClinicTests;
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
@ActiveProfiles("jdbc")
public class JdbcClinicImplTests extends AbstractClinicTests {
	
	

***REMOVED***
