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

import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.model.Owner;

import java.util.Collection;

/**
 * Repository class for <code***REMOVED***Owner</code***REMOVED*** domain objects All method names are compliant with Spring Data naming
 * conventions so this interface can easily be extended for Spring Data See here: http://static.springsource.org/spring-data/jpa/docs/current/reference/html/jpa.repositories.html#jpa.query-methods.query-creation
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 * @author Sam Brannen
 * @author Michael Isvy
 */
public interface OwnerRepository {

    /**
     * Retrieve <code***REMOVED***Owner</code***REMOVED***s from the data store by last name, returning all owners whose last name <i***REMOVED***starts</i***REMOVED***
     * with the given name.
     *
     * @param lastName Value to search for
     * @return a <code***REMOVED***Collection</code***REMOVED*** of matching <code***REMOVED***Owner</code***REMOVED***s (or an empty <code***REMOVED***Collection</code***REMOVED*** if none
     *         found)
     */
    Collection<Owner***REMOVED*** findByLastName(String lastName) throws DataAccessException;

    /**
     * Retrieve an <code***REMOVED***Owner</code***REMOVED*** from the data store by id.
     *
     * @param id the id to search for
     * @return the <code***REMOVED***Owner</code***REMOVED*** if found
     * @throws org.springframework.dao.DataRetrievalFailureException
     *          if not found
     */
    Owner findById(int id) throws DataAccessException;


    /**
     * Save an <code***REMOVED***Owner</code***REMOVED*** to the data store, either inserting or updating it.
     *
     * @param owner the <code***REMOVED***Owner</code***REMOVED*** to save
     * @see BaseEntity#isNew
     */
    void save(Owner owner) throws DataAccessException;


***REMOVED***
