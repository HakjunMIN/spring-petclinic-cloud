package org.springframework.samples.petclinic.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * Simple JavaBean domain object with an id property.
 * Used as a base class for objects needing this property.
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 */
@MappedSuperclass
public class BaseEntity {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Integer id;
	

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
