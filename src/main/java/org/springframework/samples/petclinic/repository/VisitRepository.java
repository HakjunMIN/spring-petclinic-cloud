package org.springframework.samples.petclinic.repository;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.BaseEntity;
import org.springframework.samples.petclinic.Visit;

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
public interface VisitRepository {

	/**
	 * Save a <code***REMOVED***Visit</code***REMOVED*** to the data store, either inserting or updating it.
	 * @param visit the <code***REMOVED***Visit</code***REMOVED*** to save
	 * @see BaseEntity#isNew
	 */
	void save(Visit visit) throws DataAccessException;

	List<Visit***REMOVED*** findByPetId(Integer petId);

***REMOVED***
