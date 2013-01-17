package org.springframework.samples.petclinic.repository.jdbc;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.ParameterizedBeanPropertyRowMapper;
import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jmx.export.annotation.ManagedOperation;
import org.springframework.jmx.export.annotation.ManagedResource;
import org.springframework.orm.ObjectRetrievalFailureException;
import org.springframework.samples.petclinic.Owner;
import org.springframework.samples.petclinic.Pet;
import org.springframework.samples.petclinic.PetType;
import org.springframework.samples.petclinic.Specialty;
import org.springframework.samples.petclinic.Vet;
import org.springframework.samples.petclinic.Visit;
import org.springframework.samples.petclinic.repository.VetRepository;
import org.springframework.samples.petclinic.service.ClinicService;
import org.springframework.samples.petclinic.util.EntityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * A simple JDBC-based implementation of the {@link ClinicService***REMOVED*** interface.
 *
 * <p***REMOVED***This class uses Java 5 language features and the {@link SimpleJdbcTemplate***REMOVED***
 * plus {@link SimpleJdbcInsert***REMOVED***. It also takes advantage of classes like
 * {@link BeanPropertySqlParameterSource***REMOVED*** and
 * {@link ParameterizedBeanPropertyRowMapper***REMOVED*** which provide automatic mapping
 * between JavaBean properties and JDBC parameters or query results.
 *
 * <p***REMOVED***JdbcClinicImpl is a rewrite of the AbstractJdbcClinic which was the base
 * class for JDBC implementations of the ClinicService interface for Spring 2.0.
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 * @author Rob Harrop
 * @author Sam Brannen
 * @author Thomas Risberg
 * @author Mark Fisher
 */
@Service
public class JdbcVetRepositoryImpl implements VetRepository {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private JdbcTemplate jdbcTemplate;

	private final List<Vet***REMOVED*** vets = new ArrayList<Vet***REMOVED***();



	/**
	 * Refresh the cache of Vets that the ClinicService is holding.
	 * @see org.springframework.samples.petclinic.service.ClinicService#getVets()
	 */
	@ManagedOperation
	@Transactional(readOnly = true)
	public void refreshVetsCache() throws DataAccessException {
		synchronized (this.vets) {
			this.logger.info("Refreshing vets cache");

			// Retrieve the list of all vets.
			this.vets.clear();
			this.vets.addAll(this.jdbcTemplate.query(
					"SELECT id, first_name, last_name FROM vets ORDER BY last_name,first_name",
					ParameterizedBeanPropertyRowMapper.newInstance(Vet.class)));

			// Retrieve the list of all possible specialties.
			final List<Specialty***REMOVED*** specialties = this.jdbcTemplate.query(
					"SELECT id, name FROM specialties",
					ParameterizedBeanPropertyRowMapper.newInstance(Specialty.class));

			// Build each vet's list of specialties.
			for (Vet vet : this.vets) {
				final List<Integer***REMOVED*** vetSpecialtiesIds = this.jdbcTemplate.query(
						"SELECT specialty_id FROM vet_specialties WHERE vet_id=?",
						new ParameterizedRowMapper<Integer***REMOVED***() {
							public Integer mapRow(ResultSet rs, int row) throws SQLException {
								return Integer.valueOf(rs.getInt(1));
							***REMOVED******REMOVED***,
						vet.getId().intValue());
				for (int specialtyId : vetSpecialtiesIds) {
					Specialty specialty = EntityUtils.getById(specialties, Specialty.class, specialtyId);
					vet.addSpecialty(specialty);
				***REMOVED***
			***REMOVED***
		***REMOVED***
	***REMOVED***

	@Transactional(readOnly = true)
	public Collection<Vet***REMOVED*** getVets() throws DataAccessException {
		synchronized (this.vets) {
			if (this.vets.isEmpty()) {
				refreshVetsCache();
			***REMOVED***
			return this.vets;
		***REMOVED***
	***REMOVED***


***REMOVED***
