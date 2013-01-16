package org.springframework.samples.petclinic;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * Simple JavaBean domain object representing an person.
 *
 * @author Ken Krebs
 */
@MappedSuperclass
public class Person extends BaseEntity {
	
	@Column(name="first_name")
	@NotEmpty
	protected String firstName;

	@Column(name="last_name")
	@NotEmpty
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
