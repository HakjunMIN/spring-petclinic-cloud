package org.springframework.samples.petclinic.jpa;

import java.util.List;

import org.springframework.samples.petclinic.aspects.UsageLogAspect;

/**
 * <p***REMOVED***
 * Tests for the DAO variant based on the shared EntityManager approach. Uses
 * TopLink Essentials (the reference implementation) for testing.
 * </p***REMOVED***
 * <p***REMOVED***
 * Specifically tests usage of an <code***REMOVED***orm.xml</code***REMOVED*** file, loaded by the
 * persistence provider through the Spring-provided persistence unit root URL.
 * </p***REMOVED***
 *
 * @author Rod Johnson
 * @author Juergen Hoeller
 */
public class EntityManagerClinicTests extends AbstractJpaClinicTests {

	private UsageLogAspect usageLogAspect;

	public void setUsageLogAspect(UsageLogAspect usageLogAspect) {
		this.usageLogAspect = usageLogAspect;
	***REMOVED***

	@Override
	protected String[] getConfigPaths() {
		return new String[] {
			"applicationContext-jpaCommon.xml",
			"applicationContext-toplinkAdapter.xml",
			"applicationContext-entityManager.xml"
		***REMOVED***;
	***REMOVED***

	public void testUsageLogAspectIsInvoked() {
		String name1 = "Schuurman";
		String name2 = "Greenwood";
		String name3 = "Leau";

		assertTrue(this.clinic.findOwners(name1).isEmpty());
		assertTrue(this.clinic.findOwners(name2).isEmpty());

		List<String***REMOVED*** namesRequested = this.usageLogAspect.getNamesRequested();
		assertTrue(namesRequested.contains(name1));
		assertTrue(namesRequested.contains(name2));
		assertFalse(namesRequested.contains(name3));
	***REMOVED***

***REMOVED***
