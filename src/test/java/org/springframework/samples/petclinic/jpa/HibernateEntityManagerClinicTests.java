package org.springframework.samples.petclinic.jpa;

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
public class HibernateEntityManagerClinicTests extends EntityManagerClinicTests {

	@Override
	protected String[] getConfigPaths() {
		return new String[] {
			"applicationContext-jpaCommon.xml",
			"applicationContext-hibernateAdapter.xml",
			"applicationContext-entityManager.xml"
		***REMOVED***;
	***REMOVED***

***REMOVED***
