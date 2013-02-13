package org.springframework.samples.petclinic.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlElement;

import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PropertyComparator;

/**
 * Simple JavaBean domain object representing a veterinarian.
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 * @author Sam Brannen
 * @author Arjen Poutsma
 */
@Entity @Table(name="vets")
public class Vet extends Person {

	@ManyToMany(fetch=FetchType.EAGER) 
	@JoinTable (name="vet_specialties",joinColumns = @JoinColumn(name = "vet_id"), 
										inverseJoinColumns= @JoinColumn(name = "specialty_id"))
	private Set<Specialty***REMOVED*** specialties;


	protected void setSpecialtiesInternal(Set<Specialty***REMOVED*** specialties) {
		this.specialties = specialties;
	***REMOVED***

	protected Set<Specialty***REMOVED*** getSpecialtiesInternal() {
		if (this.specialties == null) {
			this.specialties = new HashSet<Specialty***REMOVED***();
		***REMOVED***
		return this.specialties;
	***REMOVED***

	@XmlElement
	public List<Specialty***REMOVED*** getSpecialties() {
		List<Specialty***REMOVED*** sortedSpecs = new ArrayList<Specialty***REMOVED***(getSpecialtiesInternal());
		PropertyComparator.sort(sortedSpecs, new MutableSortDefinition("name", true, true));
		return Collections.unmodifiableList(sortedSpecs);
	***REMOVED***

	public int getNrOfSpecialties() {
		return getSpecialtiesInternal().size();
	***REMOVED***

	public void addSpecialty(Specialty specialty) {
		getSpecialtiesInternal().add(specialty);
	***REMOVED***

***REMOVED***
