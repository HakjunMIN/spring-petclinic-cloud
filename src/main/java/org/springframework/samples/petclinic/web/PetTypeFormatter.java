package org.springframework.samples.petclinic.web;


import java.text.ParseException;
import java.util.Collection;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.Formatter;
import org.springframework.samples.petclinic.PetType;
import org.springframework.samples.petclinic.service.ClinicService;

/**
 * Instructs Spring MVC on how to parse and print elements of type 'PetType'.
 * Starting from Spring 3.0, Formatters have come as an improvement in comparison to legacy PropertyEditors.
 * See the following links for more details: 
 * - The Spring ref doc: {@linktourl http://static.springsource.org/spring/docs/current/spring-framework-reference/html/validation.html#format-Formatter-SPI
 * - A nice blog entry from Gordon Dickens: http://gordondickens.com/wordpress/2010/09/30/using-spring-3-0-custom-type-converter/
 * 
 * Also see how the bean 'conversionService' has been declared inside /WEB-INF/mvc-core-config.xml
 * 
 * @author Mark Fisher
 * @author Juergen Hoeller
 * @author Michael Isvy
 */
public class PetTypeFormatter implements Formatter<PetType***REMOVED*** {

	private final ClinicService clinicService;


	@Autowired
	public PetTypeFormatter(ClinicService clinicService) {
		this.clinicService = clinicService;
	***REMOVED***

	@Override
	public String print(PetType petType, Locale locale) {
		return petType.getName();
	***REMOVED***

	@Override
	public PetType parse(String text, Locale locale) throws ParseException {
		Collection<PetType***REMOVED*** findPetTypes = this.clinicService.findPetTypes();
		for (PetType type : findPetTypes) {
			if (type.getName().equals(text)) {
				return type;
			***REMOVED***
		***REMOVED***
		throw new ParseException("type not found: "+text, 0);
	***REMOVED***

***REMOVED***
