package org.springframework.samples.petclinic;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.core.style.ToStringCreator;

/**
 * Simple JavaBean domain object representing an owner.
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 * @author Sam Brannen
 */
@Entity @Table(name="owners")
public class Owner extends Person {
	@Column(name="address")
	private String address;
	
	@Column(name="city")
	private String city;

	@Column(name="telephone")
	private String telephone;

	@OneToMany(cascade=CascadeType.ALL, mappedBy="owner")
	private Set<Pet***REMOVED*** pets;


	public String getAddress() {
		return this.address;
	***REMOVED***

	public void setAddress(String address) {
		this.address = address;
	***REMOVED***

	public String getCity() {
		return this.city;
	***REMOVED***

	public void setCity(String city) {
		this.city = city;
	***REMOVED***

	public String getTelephone() {
		return this.telephone;
	***REMOVED***

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	***REMOVED***

	protected void setPetsInternal(Set<Pet***REMOVED*** pets) {
		this.pets = pets;
	***REMOVED***

	protected Set<Pet***REMOVED*** getPetsInternal() {
		if (this.pets == null) {
			this.pets = new HashSet<Pet***REMOVED***();
		***REMOVED***
		return this.pets;
	***REMOVED***

	public List<Pet***REMOVED*** getPets() {
		List<Pet***REMOVED*** sortedPets = new ArrayList<Pet***REMOVED***(getPetsInternal());
		PropertyComparator.sort(sortedPets, new MutableSortDefinition("name", true, true));
		return Collections.unmodifiableList(sortedPets);
	***REMOVED***

	public void addPet(Pet pet) {
		getPetsInternal().add(pet);
		pet.setOwner(this);
	***REMOVED***

	/**
	 * Return the Pet with the given name, or null if none found for this Owner.
	 *
	 * @param name to test
	 * @return true if pet name is already in use
	 */
	public Pet getPet(String name) {
		return getPet(name, false);
	***REMOVED***

	/**
	 * Return the Pet with the given name, or null if none found for this Owner.
	 *
	 * @param name to test
	 * @return true if pet name is already in use
	 */
	public Pet getPet(String name, boolean ignoreNew) {
		name = name.toLowerCase();
		for (Pet pet : getPetsInternal()) {
			if (!ignoreNew || !pet.isNew()) {
				String compName = pet.getName();
				compName = compName.toLowerCase();
				if (compName.equals(name)) {
					return pet;
				***REMOVED***
			***REMOVED***
		***REMOVED***
		return null;
	***REMOVED***

	@Override
	public String toString() {
		return new ToStringCreator(this)

		.append("id", this.getId())

		.append("new", this.isNew())

		.append("lastName", this.getLastName())

		.append("firstName", this.getFirstName())

		.append("address", this.address)

		.append("city", this.city)

		.append("telephone", this.telephone)

		.toString();
	***REMOVED***
***REMOVED***
