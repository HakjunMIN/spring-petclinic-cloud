package org.springframework.samples.petclinic;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

/**
 * Simple JavaBean domain object representing an person.
 *
 * @author Ken Krebs
 */
@MappedSuperclass
public class Person extends BaseEntity {
	
	@Column(name="first_name")
	protected String firstName;

	@Column(name="last_name")
	protected String lastName;

	public String getFirstName() {
		return this.firstName;
	***REMOVED***

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	***REMOVED***

	public String getLastName() {
		return this.lastName;
	***REMOVED***

	public void setLastName(String lastName) {
		this.lastName = lastName;
	***REMOVED***



***REMOVED***
