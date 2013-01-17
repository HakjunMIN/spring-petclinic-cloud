package org.springframework.samples.petclinic.repository;

import java.util.Collection;

import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.BaseEntity;
import org.springframework.samples.petclinic.Owner;

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
public interface OwnerRepository {

	/**
	 * Retrieve <code***REMOVED***Owner</code***REMOVED***s from the data store by last name,
	 * returning all owners whose last name <i***REMOVED***starts</i***REMOVED*** with the given name.
	 * @param lastName Value to search for
	 * @return a <code***REMOVED***Collection</code***REMOVED*** of matching <code***REMOVED***Owner</code***REMOVED***s
	 * (or an empty <code***REMOVED***Collection</code***REMOVED*** if none found)
	 */
	Collection<Owner***REMOVED*** findByLastName(String lastName) throws DataAccessException;

	/**
	 * Retrieve an <code***REMOVED***Owner</code***REMOVED*** from the data store by id.
	 * @param id the id to search for
	 * @return the <code***REMOVED***Owner</code***REMOVED*** if found
	 * @throws org.springframework.dao.DataRetrievalFailureException if not found
	 */
	Owner findById(int id) throws DataAccessException;


	/**
	 * Save an <code***REMOVED***Owner</code***REMOVED*** to the data store, either inserting or updating it.
	 * @param owner the <code***REMOVED***Owner</code***REMOVED*** to save
	 * @see BaseEntity#isNew
	 */
	void save(Owner owner) throws DataAccessException;


***REMOVED***
