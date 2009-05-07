package org.springframework.samples.petclinic.appointments;

import java.util.Date;

import org.springframework.stereotype.Repository;

@Repository
public class StubAppointmentBook implements AppointmentBook {

	public Appointments getAppointmentsForDay(Date day) {
		return new Appointments();
	***REMOVED***

	public Appointments getAppointmentsForToday() {
		return new Appointments();
	***REMOVED***

	public Long createAppointment(AppointmentForm form) {
		return 1L;
	***REMOVED***


***REMOVED***
