
package org.springframework.samples.petclinic.web;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.Clinic;
import org.springframework.samples.petclinic.Pet;
import org.springframework.samples.petclinic.PetType;
import org.springframework.samples.petclinic.validation.PetValidator;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

/**
 * JavaBean Form controller that is used to edit an existing <code***REMOVED***Pet</code***REMOVED***.
 * 
 * @author Juergen Hoeller
 * @author Ken Krebs
 * @author Arjen Poutsma
 */
@Controller
@RequestMapping("/owners/*/pets/{petId***REMOVED***/edit")
@SessionAttributes("pet")
public class EditPetForm {

	private final Clinic clinic;


	@Autowired
	public EditPetForm(Clinic clinic) {
		this.clinic = clinic;
	***REMOVED***

	@ModelAttribute("types")
	public Collection<PetType***REMOVED*** populatePetTypes() {
		return this.clinic.getPetTypes();
	***REMOVED***

	@InitBinder
	public void setAllowedFields(WebDataBinder dataBinder) {
		dataBinder.setDisallowedFields("id");
	***REMOVED***

	@RequestMapping(method = RequestMethod.GET)
	public String setupForm(@PathVariable("petId") int petId, Model model) {
		Pet pet = this.clinic.loadPet(petId);
		model.addAttribute("pet", pet);
		return "pets/form";
	***REMOVED***

	@RequestMapping(method = { RequestMethod.PUT, RequestMethod.POST ***REMOVED***)
	public String processSubmit(@ModelAttribute("pet") Pet pet, BindingResult result, SessionStatus status) {
		new PetValidator().validate(pet, result);
		if (result.hasErrors()) {
			return "pets/form";
		***REMOVED***
		else {
			this.clinic.storePet(pet);
			status.setComplete();
			return "redirect:/owners/" + pet.getOwner().getId();
		***REMOVED***
	***REMOVED***

	@RequestMapping(method = RequestMethod.DELETE)
	public String deletePet(@PathVariable int petId) {
		Pet pet = this.clinic.loadPet(petId);
		this.clinic.deletePet(petId);
		return "redirect:/owners/" + pet.getOwner().getId();
	***REMOVED***

***REMOVED***
