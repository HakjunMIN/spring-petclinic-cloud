/*
 * Copyright 2002-2017 the original author or authors.
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
package org.springframework.samples.petclinic.customers.web;

import io.micrometer.core.instrument.MeterRegistry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.samples.petclinic.customers.model.Owner;
import org.springframework.samples.petclinic.customers.model.OwnerRepository;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

/**
 * @author Juergen Hoeller
 * @author Ken Krebs
 * @author Arjen Poutsma
 * @author Michael Isvy
 * @author Maciej Szarlinski
 */
@RequestMapping("/owners")
@RestController
@RequiredArgsConstructor
@Slf4j
class OwnerResource {

    private final OwnerRepository ownerRepository;
    private final MeterRegistry registry;

    /**
     * Create Owner
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createOwner(@Valid @RequestBody Owner owner) {
        registry.counter("create.owner").increment();
        ownerRepository.save(owner);
    ***REMOVED***

    /**
     * Read single Owner
     */
    @GetMapping(value = "/{ownerId***REMOVED***")
    public Optional<Owner***REMOVED*** findOwner(@PathVariable("ownerId") int ownerId) {
        return ownerRepository.findById(ownerId);
    ***REMOVED***

    /**
     * Read List of Owners
     */
    @GetMapping
    public List<Owner***REMOVED*** findAll() {
        return ownerRepository.findAll();
    ***REMOVED***

    /**
     * Update Owner
     */
    @PutMapping(value = "/{ownerId***REMOVED***")
    public Owner updateOwner(@PathVariable("ownerId") int ownerId, @Valid @RequestBody Owner ownerRequest) {
        final Optional<Owner***REMOVED*** owner = ownerRepository.findById(ownerId);

        final Owner ownerModel = owner.orElseThrow(() -***REMOVED*** new ResourceNotFoundException("Owner "+ownerId+" not found"));
        // This is done by hand for simplicity purpose. In a real life use-case we should consider using MapStruct.
        ownerModel.setFirstName(ownerRequest.getFirstName());
        ownerModel.setLastName(ownerRequest.getLastName());
        ownerModel.setCity(ownerRequest.getCity());
        ownerModel.setAddress(ownerRequest.getAddress());
        ownerModel.setTelephone(ownerRequest.getTelephone());
        log.info("Saving owner {***REMOVED***", ownerModel);
        registry.counter("update.owner").increment();
        return ownerRepository.save(ownerModel);
    ***REMOVED***
***REMOVED***
