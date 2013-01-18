package org.springframework.samples.petclinic.repository;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.BaseEntity;
import org.springframework.samples.petclinic.Pet;
import org.springframework.samples.petclinic.PetType;

/**
 * The high-level PetClinic business interface.
 *
 * <p***REMOVED***This is basically a data access object.
 * PetClinic doesn't have a dedicated business facade.
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 * @author Sam Brannen
 */
public interface PetRepository {

	/**
	 * Retrieve all <code***REMOVED***PetType</code***REMOVED***s from the data store.
	 * @return a <code***REMOVED***Collection</code***REMOVED*** of <code***REMOVED***PetType</code***REMOVED***s
	 */
	List<PetType***REMOVED*** findPetTypes() throws DataAccessException;

	/**
	 * Retrieve a <code***REMOVED***Pet</code***REMOVED*** from the data store by id.
	 * @param id the id to search for
	 * @return the <code***REMOVED***Pet</code***REMOVED*** if found
	 * @throws org.springframework.dao.DataRetrievalFailureException if not found
	 */
	Pet findById(int id) throws DataAccessException;

	/**
	 * Save a <code***REMOVED***Pet</code***REMOVED*** to the data store, either inserting or updating it.
	 * @param pet the <code***REMOVED***Pet</code***REMOVED*** to save
	 * @see BaseEntity#isNew
	 */
	void save(Pet pet) throws DataAccessException;

***REMOVED***
