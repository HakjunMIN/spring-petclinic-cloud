package org.springframework.samples.petclinic.repository;

import java.util.Collection;

import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.model.Vet;

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
public interface VetRepository {

	/**
	 * Retrieve all <code***REMOVED***Vet</code***REMOVED***s from the data store.
	 * @return a <code***REMOVED***Collection</code***REMOVED*** of <code***REMOVED***Vet</code***REMOVED***s
	 */
	Collection<Vet***REMOVED*** findAll() throws DataAccessException;


***REMOVED***
