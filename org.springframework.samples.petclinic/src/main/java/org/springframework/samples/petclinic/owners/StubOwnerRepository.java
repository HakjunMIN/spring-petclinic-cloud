package org.springframework.samples.petclinic.owners;

import java.util.Collection;

import org.springframework.stereotype.Repository;

@Repository
public class StubOwnerRepository implements OwnerRepository {

	public Collection<Owner***REMOVED*** findOwnersByLastName(String lastName) {
		return null;
	***REMOVED***

	public Owner getOwner(Long id) {
		return new Owner(id);
	***REMOVED***

	public Long saveOwner(Owner owner) {
		return 1L;
	***REMOVED***

***REMOVED***
