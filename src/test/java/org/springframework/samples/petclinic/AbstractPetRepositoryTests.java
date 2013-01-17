package org.springframework.samples.petclinic;

import java.util.Collection;
import java.util.Date;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import org.junit.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.repository.OwnerRepository;
import org.springframework.samples.petclinic.repository.PetRepository;
import org.springframework.samples.petclinic.service.ClinicService;
import org.springframework.samples.petclinic.util.EntityUtils;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractTransactionalJUnit4SpringContextTests;
import org.springframework.transaction.annotation.Transactional;

/**
 * <p***REMOVED***
 * Base class for {@link ClinicService***REMOVED*** integration tests.
 * </p***REMOVED***
 * <p***REMOVED***
 * &quot;AbstractClinicTests-context.xml&quot; declares a common
 * {@link javax.sql.DataSource DataSource***REMOVED***. Subclasses should specify
 * additional context locations which declare a
 * {@link org.springframework.transaction.PlatformTransactionManager PlatformTransactionManager***REMOVED***
 * and a concrete implementation of {@link ClinicService***REMOVED***.
 * </p***REMOVED***
 * <p***REMOVED***
 * This class extends {@link AbstractTransactionalJUnit4SpringContextTests***REMOVED***,
 * one of the valuable testing support classes provided by the
 * <em***REMOVED***Spring TestContext Framework</em***REMOVED*** found in the
 * <code***REMOVED***org.springframework.test.context</code***REMOVED*** package. The
 * annotation-driven configuration used here represents best practice for
 * integration tests with Spring. Note, however, that
 * AbstractTransactionalJUnit4SpringContextTests serves only as a convenience
 * for extension. For example, if you do not wish for your test classes to be
 * tied to a Spring-specific class hierarchy, you may configure your tests with
 * annotations such as {@link ContextConfiguration @ContextConfiguration***REMOVED***,
 * {@link org.springframework.test.context.TestExecutionListeners @TestExecutionListeners***REMOVED***,
 * {@link org.springframework.transaction.annotation.Transactional @Transactional***REMOVED***,
 * etc.
 * </p***REMOVED***
 * <p***REMOVED***
 * AbstractClinicTests and its subclasses benefit from the following services
 * provided by the Spring TestContext Framework:
 * </p***REMOVED***
 * <ul***REMOVED***
 * <li***REMOVED***<strong***REMOVED***Spring IoC container caching</strong***REMOVED*** which spares us
 * unnecessary set up time between test execution.</li***REMOVED***
 * <li***REMOVED***<strong***REMOVED***Dependency Injection</strong***REMOVED*** of test fixture instances,
 * meaning that we don't need to perform application context lookups. See the
 * use of {@link Autowired @Autowired***REMOVED*** on the <code***REMOVED***petRepository</code***REMOVED*** instance
 * variable, which uses autowiring <em***REMOVED***by type</em***REMOVED***. As an alternative, we
 * could annotate <code***REMOVED***petRepository</code***REMOVED*** with
 * {@link javax.annotation.Resource @Resource***REMOVED*** to achieve dependency injection
 * <em***REMOVED***by name</em***REMOVED***.
 * <em***REMOVED***(see: {@link ContextConfiguration @ContextConfiguration***REMOVED***,
 * {@link org.springframework.test.context.support.DependencyInjectionTestExecutionListener DependencyInjectionTestExecutionListener***REMOVED***)</em***REMOVED***</li***REMOVED***
 * <li***REMOVED***<strong***REMOVED***Transaction management</strong***REMOVED***, meaning each test method is
 * executed in its own transaction, which is automatically rolled back by
 * default. Thus, even if tests insert or otherwise change database state, there
 * is no need for a teardown or cleanup script.
 * <em***REMOVED***(see: {@link org.springframework.test.context.transaction.TransactionConfiguration @TransactionConfiguration***REMOVED***,
 * {@link org.springframework.transaction.annotation.Transactional @Transactional***REMOVED***,
 * {@link org.springframework.test.context.transaction.TransactionalTestExecutionListener TransactionalTestExecutionListener***REMOVED***)</em***REMOVED***</li***REMOVED***
 * <li***REMOVED***<strong***REMOVED***Useful inherited protected fields</strong***REMOVED***, such as a
 * {@link org.springframework.jdbc.core.simple.SimpleJdbcTemplate SimpleJdbcTemplate***REMOVED***
 * that can be used to verify database state after test operations or to verify
 * the results of queries performed by application code. An
 * {@link org.springframework.context.ApplicationContext ApplicationContext***REMOVED*** is
 * also inherited and can be used for explicit bean lookup if necessary.
 * <em***REMOVED***(see: {@link org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests AbstractJUnit4SpringContextTests***REMOVED***,
 * {@link AbstractTransactionalJUnit4SpringContextTests***REMOVED***)</em***REMOVED***</li***REMOVED***
 * </ul***REMOVED***
 * <p***REMOVED***
 * The Spring TestContext Framework and related unit and integration testing
 * support classes are shipped in <code***REMOVED***spring-test.jar</code***REMOVED***.
 * </p***REMOVED***
 *
 * @author Ken Krebs
 * @author Rod Johnson
 * @author Juergen Hoeller
 * @author Sam Brannen
 */
public abstract class AbstractPetRepositoryTests {

	@Autowired
	protected PetRepository petRepository;
	
	@Autowired
	protected OwnerRepository ownerRepository;


	@Test
	public void getPetTypes() {
		Collection<PetType***REMOVED*** petTypes = this.petRepository.getPetTypes();
		
		PetType t1 = EntityUtils.getById(petTypes, PetType.class, 1);
		assertEquals("cat", t1.getName());
		PetType t4 = EntityUtils.getById(petTypes, PetType.class, 4);
		assertEquals("snake", t4.getName());
	***REMOVED***

	@Test
	public void findPet() {
		Collection<PetType***REMOVED*** types = this.petRepository.getPetTypes();
		Pet p7 = this.petRepository.findById(7);
		assertTrue(p7.getName().startsWith("Samantha"));
		assertEquals(EntityUtils.getById(types, PetType.class, 1).getId(), p7.getType().getId());
		assertEquals("Jean", p7.getOwner().getFirstName());
		Pet p6 = this.petRepository.findById(6);
		assertEquals("George", p6.getName());
		assertEquals(EntityUtils.getById(types, PetType.class, 4).getId(), p6.getType().getId());
		assertEquals("Peter", p6.getOwner().getFirstName());
	***REMOVED***

	@Test @Transactional
	public void insertPet() {
		Owner o6 = this.ownerRepository.findById(6);
		int found = o6.getPets().size();
		Pet pet = new Pet();
		pet.setName("bowser");
		Collection<PetType***REMOVED*** types = this.petRepository.getPetTypes();
		pet.setType(EntityUtils.getById(types, PetType.class, 2));
		pet.setBirthDate(new Date());
		o6.addPet(pet);
		assertEquals(found + 1, o6.getPets().size());
		// both storePet and storeOwner are necessary to cover all ORM tools
		this.petRepository.storePet(pet);
		this.ownerRepository.save(o6);
		o6 = this.ownerRepository.findById(6);
		assertEquals(found + 1, o6.getPets().size());
	***REMOVED***

	@Test
	public void updatePet() throws Exception {
		Pet p7 = this.petRepository.findById(7);
		String old = p7.getName();
		p7.setName(old + "X");
		this.petRepository.storePet(p7);
		p7 = this.petRepository.findById(7);
		assertEquals(old + "X", p7.getName());
	***REMOVED***

***REMOVED***
