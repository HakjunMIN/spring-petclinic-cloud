package org.springframework.samples.petclinic.customers.application;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.customers.domain.model.pet.Pet;
import org.springframework.samples.petclinic.customers.domain.model.pet.PetRepository;
import org.springframework.samples.petclinic.customers.domain.model.pet.PetType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Optional;

/**
 * @author mszarlinski on 2016-10-30.
 */
@Service
public class PetService {

    private static final Logger LOG = LoggerFactory.getLogger(PetService.class);

    private final PetRepository petRepository;

    @Autowired
    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    ***REMOVED***

    @Transactional(readOnly = true)
    public Pet findPetById(int id) throws DataAccessException {
        return petRepository.findById(id);
    ***REMOVED***

    @Transactional
    public void savePet(Pet pet) throws DataAccessException {
        LOG.info("Saving pet {***REMOVED***", pet);
        petRepository.save(pet);
    ***REMOVED***

    @Transactional(readOnly = true)
    public Collection<PetType***REMOVED*** findPetTypes() throws DataAccessException {
        return petRepository.findPetTypes();
    ***REMOVED***

    @Transactional(readOnly = true)
    public Optional<PetType***REMOVED*** findPetTypeById(int typeId) {
        return petRepository.findPetTypeById(typeId);
    ***REMOVED***
***REMOVED***
