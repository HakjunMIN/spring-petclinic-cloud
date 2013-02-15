
package org.springframework.samples.petclinic.repository.jpa;

import org.junit.runner.RunWith;
import org.springframework.samples.petclinic.repository.AbstractOwnerRepositoryTests;
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

@ContextConfiguration(locations={"classpath:spring/dao-config.xml"***REMOVED***)
@RunWith(SpringJUnit4ClassRunner.class)
@ActiveProfiles("jpa")
public class JpaOwnerRepositoryImplTests extends AbstractOwnerRepositoryTests {
	
***REMOVED***