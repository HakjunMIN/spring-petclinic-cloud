package org.springframework.samples.petclinic.validation;

import org.springframework.samples.petclinic.Pet;
import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;

/**
 * <code***REMOVED***Validator</code***REMOVED*** for <code***REMOVED***Pet</code***REMOVED*** forms.
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 */
public class PetValidator {

	public void validate(Pet pet, Errors errors) {
		String name = pet.getName();
		if (!StringUtils.hasLength(name)) {
			errors.rejectValue("name", "required", "required");
		***REMOVED***
		else if (pet.isNew() && pet.getOwner().getPet(name, true) != null) {
			errors.rejectValue("name", "duplicate", "already exists");
		***REMOVED***
	***REMOVED***

***REMOVED***
