
package org.springframework.samples.petclinic.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.Clinic;
import org.springframework.samples.petclinic.Owner;
import org.springframework.samples.petclinic.validation.OwnerValidator;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

/**
 * JavaBean form controller that is used to add a new <code***REMOVED***Owner</code***REMOVED*** to the
 * system.
 * 
 * @author Juergen Hoeller
 * @author Ken Krebs
 * @author Arjen Poutsma
 */
@Controller
@RequestMapping("/owners/new")
@SessionAttributes(types = Owner.class)
public class AddOwnerController {

	private final Clinic clinic;


	@Autowired
	public AddOwnerController(Clinic clinic) {
		this.clinic = clinic;
	***REMOVED***

	@InitBinder
	public void setAllowedFields(WebDataBinder dataBinder) {
		dataBinder.setDisallowedFields("id");
	***REMOVED***

	@RequestMapping(method = RequestMethod.GET)
	public String setupForm(Model model) {
		Owner owner = new Owner();
		model.addAttribute(owner);
		return "owners/createOrUpdateOwnerForm";
	***REMOVED***

	@RequestMapping(method = RequestMethod.POST)
	public String processSubmit(@ModelAttribute Owner owner, BindingResult result, SessionStatus status) {
		new OwnerValidator().validate(owner, result);
		if (result.hasErrors()) {
			return "owners/createOrUpdateOwnerForm";
		***REMOVED***
		else {
			this.clinic.storeOwner(owner);
			status.setComplete();
			return "redirect:/owners/" + owner.getId();
		***REMOVED***
	***REMOVED***

***REMOVED***
