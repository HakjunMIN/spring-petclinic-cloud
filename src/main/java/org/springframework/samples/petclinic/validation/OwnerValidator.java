package org.springframework.samples.petclinic.validation;

import org.springframework.samples.petclinic.Owner;
import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;

/**
 * <code***REMOVED***Validator</code***REMOVED*** for <code***REMOVED***Owner</code***REMOVED*** forms.
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 */
public class OwnerValidator {

	public void validate(Owner owner, Errors errors) {
		if (!StringUtils.hasLength(owner.getFirstName())) {
			errors.rejectValue("firstName", "required", "required");
		***REMOVED***
		if (!StringUtils.hasLength(owner.getLastName())) {
			errors.rejectValue("lastName", "required", "required");
		***REMOVED***
		if (!StringUtils.hasLength(owner.getAddress())) {
			errors.rejectValue("address", "required", "required");
		***REMOVED***
		if (!StringUtils.hasLength(owner.getCity())) {
			errors.rejectValue("city", "required", "required");
		***REMOVED***

		String telephone = owner.getTelephone();
		if (!StringUtils.hasLength(telephone)) {
			errors.rejectValue("telephone", "required", "required");
		***REMOVED***
		else {
			for (int i = 0; i < telephone.length(); ++i) {
				if ((Character.isDigit(telephone.charAt(i))) == false) {
					errors.rejectValue("telephone", "nonNumeric", "non-numeric");
					break;
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***

***REMOVED***
