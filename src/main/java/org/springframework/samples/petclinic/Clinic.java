package org.springframework.samples.petclinic;

import java.util.Collection;

import org.springframework.dao.DataAccessException;

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
public interface Clinic {

	/**
	 * Retrieve all <code***REMOVED***Vet</code***REMOVED***s from the data store.
	 * @return a <code***REMOVED***Collection</code***REMOVED*** of <code***REMOVED***Vet</code***REMOVED***s
	 */
	Collection<Vet***REMOVED*** getVets() throws DataAccessException;

	/**
	 * Retrieve all <code***REMOVED***PetType</code***REMOVED***s from the data store.
	 * @return a <code***REMOVED***Collection</code***REMOVED*** of <code***REMOVED***PetType</code***REMOVED***s
	 */
	Collection<PetType***REMOVED*** getPetTypes() throws DataAccessException;

	/**
	 * Retrieve <code***REMOVED***Owner</code***REMOVED***s from the data store by last name,
	 * returning all owners whose last name <i***REMOVED***starts</i***REMOVED*** with the given name.
	 * @param lastName Value to search for
	 * @return a <code***REMOVED***Collection</code***REMOVED*** of matching <code***REMOVED***Owner</code***REMOVED***s
	 * (or an empty <code***REMOVED***Collection</code***REMOVED*** if none found)
	 */
	Collection<Owner***REMOVED*** findOwners(String lastName) throws DataAccessException;

	/**
	 * Retrieve an <code***REMOVED***Owner</code***REMOVED*** from the data store by id.
	 * @param id the id to search for
	 * @return the <code***REMOVED***Owner</code***REMOVED*** if found
	 * @throws org.springframework.dao.DataRetrievalFailureException if not found
	 */
	Owner findOwner(int id) throws DataAccessException;

	/**
	 * Retrieve a <code***REMOVED***Pet</code***REMOVED*** from the data store by id.
	 * @param id the id to search for
	 * @return the <code***REMOVED***Pet</code***REMOVED*** if found
	 * @throws org.springframework.dao.DataRetrievalFailureException if not found
	 */
	Pet findPet(int id) throws DataAccessException;

	/**
	 * Save an <code***REMOVED***Owner</code***REMOVED*** to the data store, either inserting or updating it.
	 * @param owner the <code***REMOVED***Owner</code***REMOVED*** to save
	 * @see BaseEntity#isNew
	 */
	void storeOwner(Owner owner) throws DataAccessException;

	/**
	 * Save a <code***REMOVED***Pet</code***REMOVED*** to the data store, either inserting or updating it.
	 * @param pet the <code***REMOVED***Pet</code***REMOVED*** to save
	 * @see BaseEntity#isNew
	 */
	void storePet(Pet pet) throws DataAccessException;

	/**
	 * Save a <code***REMOVED***Visit</code***REMOVED*** to the data store, either inserting or updating it.
	 * @param visit the <code***REMOVED***Visit</code***REMOVED*** to save
	 * @see BaseEntity#isNew
	 */
	void storeVisit(Visit visit) throws DataAccessException;

	/**
	 * Deletes a <code***REMOVED***Pet</code***REMOVED*** from the data store.
	 */
	void deletePet(int id) throws DataAccessException;

***REMOVED***
