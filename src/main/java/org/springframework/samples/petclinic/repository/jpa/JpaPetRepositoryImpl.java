package org.springframework.samples.petclinic.repository.jpa;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.samples.petclinic.model.Pet;
import org.springframework.samples.petclinic.model.PetType;
import org.springframework.samples.petclinic.repository.PetRepository;
import org.springframework.stereotype.Repository;

/**
 * JPA implementation of the ClinicService interface using EntityManager.
 *
 * <p***REMOVED***The mappings are defined in "orm.xml" located in the META-INF directory.
 *
 * @author Mike Keith
 * @author Rod Johnson
 * @author Sam Brannen
 * @author Michael Isvy
 * @since 22.4.2006
 */
@Repository
public class JpaPetRepositoryImpl implements PetRepository {

	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	public List<PetType***REMOVED*** findPetTypes() {
		return this.em.createQuery("SELECT ptype FROM PetType ptype ORDER BY ptype.name").getResultList();
	***REMOVED***

	public Pet findById(int id) {
		return this.em.find(Pet.class, id);
	***REMOVED***

	public void save(Pet pet) {
		this.em.merge(pet);
	***REMOVED***

***REMOVED***
