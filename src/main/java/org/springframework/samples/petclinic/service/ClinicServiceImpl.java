package org.springframework.samples.petclinic.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.Owner;
import org.springframework.samples.petclinic.Pet;
import org.springframework.samples.petclinic.PetType;
import org.springframework.samples.petclinic.Vet;
import org.springframework.samples.petclinic.Visit;
import org.springframework.samples.petclinic.repository.OwnerRepository;
import org.springframework.samples.petclinic.repository.PetRepository;
import org.springframework.samples.petclinic.repository.VetRepository;
import org.springframework.samples.petclinic.repository.VisitRepository;
import org.springframework.stereotype.Service;

@Service
public class ClinicServiceImpl implements ClinicService {
	
	@Autowired
	private PetRepository petRepository;
	
	@Autowired
	private VetRepository vetRepository;
	
	@Autowired
	private OwnerRepository ownerRepository;
	
	@Autowired
	private VisitRepository visitRepository;

	public Collection<PetType***REMOVED*** getPetTypes() throws DataAccessException {
		return petRepository.getPetTypes();
	***REMOVED***

	public Owner findOwnerById(int id) throws DataAccessException {
		return ownerRepository.findById(id);
	***REMOVED***

	public void storeVisit(Visit visit) throws DataAccessException {
		visitRepository.storeVisit(visit);
	***REMOVED***

	public Pet findPetById(int id) throws DataAccessException {
		return petRepository.findById(id);
	***REMOVED***

	public void storePet(Pet pet) throws DataAccessException {
		petRepository.storePet(pet);
	***REMOVED***

	public void deletePet(int id) throws DataAccessException {
		petRepository.deletePet(id);
	***REMOVED***

	public Collection<Vet***REMOVED*** getVets() throws DataAccessException {
		return vetRepository.getVets();
	***REMOVED***
	
	
	
	
	
	
	
	
	
	

***REMOVED***
