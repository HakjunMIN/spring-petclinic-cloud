package org.springframework.samples.petclinic;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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
public class Vet extends Person {

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
