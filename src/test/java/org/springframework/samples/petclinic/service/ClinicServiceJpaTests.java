
package org.springframework.samples.petclinic.service;

import org.junit.runner.RunWith;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * <p***REMOVED*** Integration test using the jpa profile. 
 * @see AbstractClinicServiceTests AbstractClinicServiceTests for more details. </p***REMOVED***
 *
 * @author Rod Johnson
 * @author Sam Brannen
 * @author Michael Isvy
 */

@ContextConfiguration(locations = {"classpath:spring/business-config.xml"***REMOVED***)
@RunWith(SpringJUnit4ClassRunner.class)
@ActiveProfiles("jpa")
public class ClinicServiceJpaTests extends AbstractClinicServiceTests {

***REMOVED***