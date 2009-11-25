package org.springframework.samples.petclinic.validation;

import org.springframework.samples.petclinic.Visit;
import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;

/**
 * <code***REMOVED***Validator</code***REMOVED*** for <code***REMOVED***Visit</code***REMOVED*** forms.
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 */
public class VisitValidator {

	public void validate(Visit visit, Errors errors) {
		if (!StringUtils.hasLength(visit.getDescription())) {
			errors.rejectValue("description", "required", "required");
		***REMOVED***
	***REMOVED***

***REMOVED***
