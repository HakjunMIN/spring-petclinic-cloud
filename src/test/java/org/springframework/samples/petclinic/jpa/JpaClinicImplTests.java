
package org.springframework.samples.petclinic.jpa;

import static junit.framework.Assert.fail;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.AbstractClinicTests;
import org.springframework.samples.petclinic.Clinic;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * <p***REMOVED***
 * Provides the following services:
 * <ul***REMOVED***
 * <li***REMOVED***Injects test dependencies, meaning that we don't need to perform
 * application context lookups. See the setClinic() method. Injection uses
 * autowiring by type.</li***REMOVED***
 * <li***REMOVED***Executes each test method in its own transaction, which is automatically
 * rolled back by default. This means that even if tests insert or otherwise
 * change database state, there is no need for a teardown or cleanup script.</li***REMOVED***
 * </ul***REMOVED***
 * <p***REMOVED***
  * </p***REMOVED***
 *
 * @author Rod Johnson
 * @author Sam Brannen
 * @author Michael Isvy
 */

@ContextConfiguration(locations={"classpath:spring/applicationContext-dao.xml"***REMOVED***)
@RunWith(SpringJUnit4ClassRunner.class)
@ActiveProfiles({"jpa","plain-jpa"***REMOVED***)
public class JpaClinicImplTests extends AbstractClinicTests {
	
	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private Clinic clinic;


	@Test
	public void testBogusJpql() {
		try {
			this.entityManager.createQuery("SELECT RUBBISH FROM RUBBISH HEAP").executeUpdate();
			fail("exception was expected because of incorrect SQL statement");
		***REMOVED*** catch (Exception e) {
			// expected
		***REMOVED***
	***REMOVED***
	
***REMOVED***