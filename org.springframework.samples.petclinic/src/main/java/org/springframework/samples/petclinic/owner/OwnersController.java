package org.springframework.samples.petclinic.owner;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.util.ResponseContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/owners")
public class OwnersController {

	private final OwnerRepository repository;

	@Autowired
	public OwnersController(OwnerRepository repository) {
		this.repository = repository;
	***REMOVED***
	
	@RequestMapping(method = RequestMethod.GET)
	public void get() {
		
	***REMOVED***
	
	@RequestMapping(value="/search", method = RequestMethod.GET)
	public Collection<Owner***REMOVED*** getSearchResults(@RequestParam String lastName) {
		return repository.findOwnersByLastName(lastName);
	***REMOVED***
	
	@RequestMapping(value="/new", method = RequestMethod.GET)
	public Owner getNewForm() {
		return new Owner();
	***REMOVED***
	
	@RequestMapping(method = RequestMethod.POST)
	public void post(Owner owner, ResponseContext response) {
		repository.saveOwner(owner);
		response.redirect(owner.getName());
	***REMOVED***	

***REMOVED***
