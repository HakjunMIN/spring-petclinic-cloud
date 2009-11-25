package org.springframework.samples.petclinic.jpa;

import java.util.Collection;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.samples.petclinic.Clinic;
import org.springframework.samples.petclinic.Owner;
import org.springframework.samples.petclinic.Pet;
import org.springframework.samples.petclinic.PetType;
import org.springframework.samples.petclinic.Vet;
import org.springframework.samples.petclinic.Visit;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.dao.DataAccessException;

/**
 * JPA implementation of the Clinic interface using EntityManager.
 *
 * <p***REMOVED***The mappings are defined in "orm.xml" located in the META-INF directory.
 *
 * @author Mike Keith
 * @author Rod Johnson
 * @author Sam Brannen
 * @since 22.4.2006
 */
@Repository
@Transactional
public class EntityManagerClinic implements Clinic {

	@PersistenceContext
	private EntityManager em;


	@Transactional(readOnly = true)
	@SuppressWarnings("unchecked")
	public Collection<Vet***REMOVED*** getVets() {
		return this.em.createQuery("SELECT vet FROM Vet vet ORDER BY vet.lastName, vet.firstName").getResultList();
	***REMOVED***

	@Transactional(readOnly = true)
	@SuppressWarnings("unchecked")
	public Collection<PetType***REMOVED*** getPetTypes() {
		return this.em.createQuery("SELECT ptype FROM PetType ptype ORDER BY ptype.name").getResultList();
	***REMOVED***

	@Transactional(readOnly = true)
	@SuppressWarnings("unchecked")
	public Collection<Owner***REMOVED*** findOwners(String lastName) {
		Query query = this.em.createQuery("SELECT owner FROM Owner owner WHERE owner.lastName LIKE :lastName");
		query.setParameter("lastName", lastName + "%");
		return query.getResultList();
	***REMOVED***

	@Transactional(readOnly = true)
	public Owner loadOwner(int id) {
		return this.em.find(Owner.class, id);
	***REMOVED***

	@Transactional(readOnly = true)
	public Pet loadPet(int id) {
		return this.em.find(Pet.class, id);
	***REMOVED***

	public void storeOwner(Owner owner) {
		// Consider returning the persistent object here, for exposing
		// a newly assigned id using any persistence provider***REMOVED***
		Owner merged = this.em.merge(owner);
		this.em.flush();
		owner.setId(merged.getId());
	***REMOVED***

	public void storePet(Pet pet) {
		// Consider returning the persistent object here, for exposing
		// a newly assigned id using any persistence provider***REMOVED***
		Pet merged = this.em.merge(pet);
		this.em.flush();
		pet.setId(merged.getId());
	***REMOVED***

	public void storeVisit(Visit visit) {
		// Consider returning the persistent object here, for exposing
		// a newly assigned id using any persistence provider***REMOVED***
		Visit merged = this.em.merge(visit);
		this.em.flush();
		visit.setId(merged.getId());
	***REMOVED***

	public void deletePet(int id) throws DataAccessException {
		Pet pet = loadPet(id);
		this.em.remove(pet);
	***REMOVED***

***REMOVED***
