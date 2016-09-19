/*
 * Copyright 2002-2013 the original author or authors.
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
package org.springframework.samples.petclinic.web;

import java.util.Date;
import java.util.Map;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.samples.petclinic.model.Owner;
import org.springframework.samples.petclinic.model.Pet;
import org.springframework.samples.petclinic.model.PetType;
import org.springframework.samples.petclinic.service.ClinicService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.support.SessionStatus;

/**
 * @author Juergen Hoeller
 * @author Ken Krebs
 * @author Arjen Poutsma
 */
@RestController
public class PetResource {

    private final ClinicService clinicService;

    @Autowired
    public PetResource(ClinicService clinicService) {
        this.clinicService = clinicService;
    ***REMOVED***

    @InitBinder
    public void setAllowedFields(WebDataBinder dataBinder) {
        dataBinder.setDisallowedFields("id");
    ***REMOVED***

    @GetMapping("/petTypes")
    Object getPetTypes() {
        return clinicService.findPetTypes();
    ***REMOVED***

    @GetMapping("/owners/{ownerId***REMOVED***/pets/new")
    public String initCreationForm(@PathVariable("ownerId") int ownerId, Map<String, Object***REMOVED*** model) {
        Owner owner = this.clinicService.findOwnerById(ownerId);
        Pet pet = new Pet();
        owner.addPet(pet);
        model.put("pet", pet);
        return "pets/createOrUpdatePetForm";
    ***REMOVED***

    @PostMapping("/owners/{ownerId***REMOVED***/pets/new")
    public String processCreationForm(@ModelAttribute("pet") Pet pet, BindingResult result, SessionStatus status) {
        new PetValidator().validate(pet, result);
        if (result.hasErrors()) {
            return "pets/createOrUpdatePetForm";
  ***REMOVED*** else {
            this.clinicService.savePet(pet);
            status.setComplete();
            return "redirect:/owner/{ownerId***REMOVED***";
  ***REMOVED***
    ***REMOVED***

    @GetMapping("/owner/*/pet/{petId***REMOVED***")
    public PetDetails findPet(@PathVariable("petId") int petId) {
        Pet pet = this.clinicService.findPetById(petId);
        return new PetDetails(pet);
    ***REMOVED***

    @RequestMapping(value = "/owners/{ownerId***REMOVED***/pets/{petId***REMOVED***/edit", method = {RequestMethod.PUT, RequestMethod.POST***REMOVED***)
    public String processUpdateForm(@ModelAttribute("pet") Pet pet, BindingResult result, SessionStatus status) {
        // we're not using @Valid annotation here because it is easier to define such validation rule in Java
        new PetValidator().validate(pet, result);
        if (result.hasErrors()) {
            return "pets/createOrUpdatePetForm";
  ***REMOVED*** else {
            this.clinicService.savePet(pet);
            status.setComplete();
            return "redirect:/owners/{ownerId***REMOVED***";
  ***REMOVED***
    ***REMOVED***

    @Getter
    static class PetDetails {

        long id;
        String name;
        String owner;
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        Date birthDate;
        PetType type;

        PetDetails(Pet pet) {
            this.id = pet.getId();
            this.name = pet.getName();
            this.owner = pet.getOwner().getFirstName() + " " + pet.getOwner().getLastName();
            this.birthDate = pet.getBirthDate();
            this.type = pet.getType();
  ***REMOVED***

    ***REMOVED***

***REMOVED***
