/*
 * Copyright 2002-2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.samples.petclinic.repository;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.model.Owner;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 * <p***REMOVED*** Base class for {@link OwnerRepository***REMOVED*** integration tests. </p***REMOVED*** <p***REMOVED*** Subclasses should specify Spring context
 * configuration using {@link ContextConfiguration @ContextConfiguration***REMOVED*** annotation </p***REMOVED*** <p***REMOVED***
 * AbstractOwnerRepositoryTests and its subclasses benefit from the following services provided by the Spring
 * TestContext Framework: </p***REMOVED*** <ul***REMOVED*** <li***REMOVED***<strong***REMOVED***Spring IoC container caching</strong***REMOVED*** which spares us unnecessary set up
 * time between test execution.</li***REMOVED*** <li***REMOVED***<strong***REMOVED***Dependency Injection</strong***REMOVED*** of test fixture instances, meaning that
 * we don't need to perform application context lookups. See the use of {@link Autowired @Autowired***REMOVED*** on the <code***REMOVED***{@link
 * AbstractOwnerRepositoryTests#ownerRepository ownerRepository***REMOVED***</code***REMOVED*** instance variable, which uses autowiring <em***REMOVED***by
 * type</em***REMOVED***. <li***REMOVED***<strong***REMOVED***Transaction management</strong***REMOVED***, meaning each test method is executed in its own transaction,
 * which is automatically rolled back by default. Thus, even if tests insert or otherwise change database state, there
 * is no need for a teardown or cleanup script. <li***REMOVED*** An {@link org.springframework.context.ApplicationContext
 * ApplicationContext***REMOVED*** is also inherited and can be used for explicit bean lookup if necessary. </li***REMOVED*** </ul***REMOVED***
 *
 * @author Ken Krebs
 * @author Rod Johnson
 * @author Juergen Hoeller
 * @author Sam Brannen
 * @author Michael Isvy
 */
public abstract class AbstractOwnerRepositoryTests {

    @Autowired
    protected OwnerRepository ownerRepository;

    @Test
    @Transactional
    public void findOwners() {
        Collection<Owner***REMOVED*** owners = this.ownerRepository.findByLastName("Davis");
        assertEquals(2, owners.size());
        owners = this.ownerRepository.findByLastName("Daviss");
        assertEquals(0, owners.size());
    ***REMOVED***

    @Test
    @Transactional
    public void findSingleOwner() {
        Owner owner1 = this.ownerRepository.findById(1);
        assertTrue(owner1.getLastName().startsWith("Franklin"));
        Owner owner10 = this.ownerRepository.findById(10);
        assertEquals("Carlos", owner10.getFirstName());

        assertEquals(owner1.getPets().size(), 1);
    ***REMOVED***

    @Test
    @Transactional
    public void insertOwner() {
        Collection<Owner***REMOVED*** owners = this.ownerRepository.findByLastName("Schultz");
        int found = owners.size();
        Owner owner = new Owner();
        owner.setFirstName("Sam");
        owner.setLastName("Schultz");
        owner.setAddress("4, Evans Street");
        owner.setCity("Wollongong");
        owner.setTelephone("4444444444");
        this.ownerRepository.save(owner);
        owners = this.ownerRepository.findByLastName("Schultz");
        assertEquals("Verifying number of owners after inserting a new one.", found + 1, owners.size());
    ***REMOVED***

    @Test
    @Transactional
    public void updateOwner() throws Exception {
        Owner o1 = this.ownerRepository.findById(1);
        String old = o1.getLastName();
        o1.setLastName(old + "X");
        this.ownerRepository.save(o1);
        o1 = this.ownerRepository.findById(1);
        assertEquals(old + "X", o1.getLastName());
    ***REMOVED***


***REMOVED***
