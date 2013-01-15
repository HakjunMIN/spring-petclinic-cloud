
package org.springframework.samples.petclinic.web;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.Clinic;
import org.springframework.samples.petclinic.Owner;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * JavaBean Form controller that is used to search for <code***REMOVED***Owner</code***REMOVED***s by
 * last name.
 * 
 * @author Juergen Hoeller
 * @author Ken Krebs
 * @author Arjen Poutsma
 */
@Controller
public class FindOwnersController {

	private final Clinic clinic;


	@Autowired
	public FindOwnersController(Clinic clinic) {
		this.clinic = clinic;
	***REMOVED***

	@InitBinder
	public void setAllowedFields(WebDataBinder dataBinder) {
		dataBinder.setDisallowedFields("id");
	***REMOVED***

	@RequestMapping(value = "/owners/find", method = RequestMethod.GET)
	public String setupForm(Model model) {
		model.addAttribute("owner", new Owner());
		return "owners/findOwners";
	***REMOVED***

	@RequestMapping(value = "/owners", method = RequestMethod.GET)
	public String processSubmit(Owner owner, BindingResult result, Model model) {

		// allow parameterless GET request for /owners to return all records
		if (owner.getLastName() == null) {
			owner.setLastName(""); // empty string signifies broadest possible search
		***REMOVED***

		// find owners by last name
		Collection<Owner***REMOVED*** results = this.clinic.findOwners(owner.getLastName());
		if (results.size() < 1) {
			// no owners found
			result.rejectValue("lastName", "notFound", "not found");
			return "owners/findOwners";
		***REMOVED***
		if (results.size() ***REMOVED*** 1) {
			// multiple owners found
			model.addAttribute("selections", results);
			return "owners/ownersList";
		***REMOVED***
		else {
			// 1 owner found
			owner = results.iterator().next();
			return "redirect:/owners/" + owner.getId();
		***REMOVED***
	***REMOVED***

***REMOVED***
