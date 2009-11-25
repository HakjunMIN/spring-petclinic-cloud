package org.springframework.samples.petclinic;

/**
 * Simple JavaBean domain object with an id property.
 * Used as a base class for objects needing this property.
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 */
public class BaseEntity {

	private Integer id;
	

	public void setId(Integer id) {
		this.id = id;
	***REMOVED***

	public Integer getId() {
		return id;
	***REMOVED***

	public boolean isNew() {
		return (this.id == null);
	***REMOVED***

***REMOVED***
