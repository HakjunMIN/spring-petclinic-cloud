package org.springframework.samples.petclinic;

import java.util.Collection;
import java.util.Date;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import org.junit.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.repository.VetRepository;
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
public abstract class AbstractVetRepositoryTests {

	@Autowired
	protected VetRepository vetRepository;


	@Test @Transactional
	public void getVets() {
		Collection<Vet***REMOVED*** vets = this.vetRepository.getVets();
		
		Vet v1 = EntityUtils.getById(vets, Vet.class, 2);
		assertEquals("Leary", v1.getLastName());
		assertEquals(1, v1.getNrOfSpecialties());
		assertEquals("radiology", (v1.getSpecialties().get(0)).getName());
		Vet v2 = EntityUtils.getById(vets, Vet.class, 3);
		assertEquals("Douglas", v2.getLastName());
		assertEquals(2, v2.getNrOfSpecialties());
		assertEquals("dentistry", (v2.getSpecialties().get(0)).getName());
		assertEquals("surgery", (v2.getSpecialties().get(1)).getName());
	***REMOVED***

***REMOVED***
