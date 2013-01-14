package org.springframework.samples.petclinic;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PropertyComparator;

/**
 * Simple JavaBean business object representing a pet.
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 * @author Sam Brannen
 */
@Entity @Table(name="pets")
public class Pet extends NamedEntity {

	@Column(name="birth_date")
	private Date birthDate;

	@ManyToOne
    @JoinColumn(name = "type_id")
	private PetType type;
	
	@ManyToOne
    @JoinColumn(name = "owner_id")
	private Owner owner;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="pet")
	private Set<Visit***REMOVED*** visits;


	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	***REMOVED***

	public Date getBirthDate() {
		return this.birthDate;
	***REMOVED***

	public void setType(PetType type) {
		this.type = type;
	***REMOVED***

	public PetType getType() {
		return this.type;
	***REMOVED***

	protected void setOwner(Owner owner) {
		this.owner = owner;
	***REMOVED***

	public Owner getOwner() {
		return this.owner;
	***REMOVED***

	protected void setVisitsInternal(Set<Visit***REMOVED*** visits) {
		this.visits = visits;
	***REMOVED***

	protected Set<Visit***REMOVED*** getVisitsInternal() {
		if (this.visits == null) {
			this.visits = new HashSet<Visit***REMOVED***();
		***REMOVED***
		return this.visits;
	***REMOVED***

	public List<Visit***REMOVED*** getVisits() {
		List<Visit***REMOVED*** sortedVisits = new ArrayList<Visit***REMOVED***(getVisitsInternal());
		PropertyComparator.sort(sortedVisits, new MutableSortDefinition("date", false, false));
		return Collections.unmodifiableList(sortedVisits);
	***REMOVED***

	public void addVisit(Visit visit) {
		getVisitsInternal().add(visit);
		visit.setPet(this);
	***REMOVED***

***REMOVED***
