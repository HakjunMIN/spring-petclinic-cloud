package org.springframework.samples.petclinic.owners;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.util.ResponseContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value="/owners/{owner***REMOVED***")
public class OwnerController {

	private final OwnerRepository repository;

	@Autowired
	public OwnerController(OwnerRepository repository) {
		this.repository = repository;
	***REMOVED***
	
	@RequestMapping(method=RequestMethod.GET)
	public Owner get(Long owner) {
		return repository.getOwner(owner);
	***REMOVED***
	
	@RequestMapping(value="/edit", method=RequestMethod.GET)
	public Owner getEditForm(Long owner) {
		return repository.getOwner(owner);
	***REMOVED***
	
	@RequestMapping(method = RequestMethod.PUT)
	public void put(Owner owner, ResponseContext response) {
		repository.saveOwner(owner);
		response.redirect(owner.getName());
	***REMOVED***	
	
***REMOVED***