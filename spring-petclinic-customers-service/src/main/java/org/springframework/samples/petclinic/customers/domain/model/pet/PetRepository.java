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
package org.springframework.samples.petclinic.customers.domain.model.pet;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * Repository class for <code***REMOVED***Pet</code***REMOVED*** domain objects All method names are compliant with Spring Data naming
 * conventions so this interface can easily be extended for Spring Data See here: http://static.springsource.org/spring-data/jpa/docs/current/reference/html/jpa.repositories.html#jpa.query-methods.query-creation
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 * @author Sam Brannen
 * @author Michael Isvy
 */
public interface PetRepository extends Repository<Pet, Integer***REMOVED*** {

    /**
     * Retrieve all {@link PetType***REMOVED***s from the data store.
     * @return a Collection of {@link PetType***REMOVED***s.
     */
    @Query("SELECT ptype FROM PetType ptype ORDER BY ptype.name")
    List<PetType***REMOVED*** findPetTypes();

    @Query("FROM PetType ptype WHERE ptype.id = :typeId")
    Optional<PetType***REMOVED*** findPetTypeById(@Param("typeId") int typeId);

    /**
     * Retrieve a {@link Pet***REMOVED*** from the data store by id.
     * @param id the id to search for
     * @return the {@link Pet***REMOVED*** if found
     */
    Pet findById(int id);

    /**
     * Save a {@link Pet***REMOVED*** to the data store, either inserting or updating it.
     * @param pet the {@link Pet***REMOVED*** to save
     */
    void save(Pet pet);

***REMOVED***
