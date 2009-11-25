package org.springframework.samples.petclinic;

/**
 * Simple JavaBean domain object adds a name property to <code***REMOVED***BaseEntity</code***REMOVED***.
 * Used as a base class for objects needing these properties.
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 */
public class NamedEntity extends BaseEntity {

	private String name;
	

	public void setName(String name) {
		this.name = name;
	***REMOVED***

	public String getName() {
		return this.name;
	***REMOVED***

	@Override
	public String toString() {
		return this.getName();
	***REMOVED***

***REMOVED***
