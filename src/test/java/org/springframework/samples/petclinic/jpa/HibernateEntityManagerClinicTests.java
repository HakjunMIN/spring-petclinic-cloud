package org.springframework.samples.petclinic.jpa;

import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * <p***REMOVED***
 * Tests for the DAO variant based on the shared EntityManager approach, using
 * Hibernate EntityManager for testing instead of the reference implementation.
 * </p***REMOVED***
 * <p***REMOVED***
 * Specifically tests usage of an <code***REMOVED***orm.xml</code***REMOVED*** file, loaded by the
 * persistence provider through the Spring-provided persistence unit root URL.
 * </p***REMOVED***
 *
 * @author Juergen Hoeller
 */
@ContextConfiguration(locations={"applicationContext-jpaCommon.xml", "applicationContext-hibernateAdapter.xml",
"applicationContext-entityManager.xml"***REMOVED***)
@RunWith(SpringJUnit4ClassRunner.class)
public class HibernateEntityManagerClinicTests extends EntityManagerClinicTests {

***REMOVED***
