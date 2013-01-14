package org.springframework.samples.petclinic.jdbc;

import org.springframework.samples.petclinic.Pet;

/**
 * Subclass of Pet that carries temporary id properties which
 * are only relevant for a JDBC implmentation of the Clinic.
 *
 * @author Juergen Hoeller
 * @see JdbcClinic
 */
class JdbcPet extends Pet {

	private int typeId;

	private int ownerId;


	public void setTypeId(int typeId) {
		this.typeId = typeId;
	***REMOVED***

	public int getTypeId() {
		return this.typeId;
	***REMOVED***

	public void setOwnerId(int ownerId) {
		this.ownerId = ownerId;
	***REMOVED***

	public int getOwnerId() {
		return this.ownerId;
	***REMOVED***

***REMOVED***
