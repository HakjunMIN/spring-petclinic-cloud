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

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.model.Pet;
import org.springframework.samples.petclinic.model.PetType;

/**
 * Repository class for <code***REMOVED***Pet</code***REMOVED*** domain objects All method names are compliant with Spring Data naming
 * conventions so this interface can easily be extended for Spring Data See here: http://static.springsource.org/spring-data/jpa/docs/current/reference/html/jpa.repositories.html#jpa.query-methods.query-creation
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 * @author Sam Brannen
 * @author Michael Isvy
 */
public interface PetRepository {

    /**
     * Retrieve all <code***REMOVED***PetType</code***REMOVED***s from the data store.
     *
     * @return a <code***REMOVED***Collection</code***REMOVED*** of <code***REMOVED***PetType</code***REMOVED***s
     */
    List<PetType***REMOVED*** findPetTypes() throws DataAccessException;

    /**
     * Retrieve a <code***REMOVED***Pet</code***REMOVED*** from the data store by id.
     *
     * @param id the id to search for
     * @return the <code***REMOVED***Pet</code***REMOVED*** if found
     * @throws org.springframework.dao.DataRetrievalFailureException
     *          if not found
     */
    Pet findById(int id) throws DataAccessException;

    /**
     * Save a <code***REMOVED***Pet</code***REMOVED*** to the data store, either inserting or updating it.
     *
     * @param pet the <code***REMOVED***Pet</code***REMOVED*** to save
     * @see BaseEntity#isNew
     */
    void save(Pet pet) throws DataAccessException;

***REMOVED***
