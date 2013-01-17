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
import org.springframework.samples.petclinic.repository.OwnerRepository;
import org.springframework.samples.petclinic.repository.PetRepository;
import org.springframework.samples.petclinic.repository.VisitRepository;
import org.springframework.samples.petclinic.service.ClinicService;
import org.springframework.samples.petclinic.util.EntityUtils;
import org.springframework.stereotype.Repository;
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
@Repository
public class JdbcPetRepositoryImpl implements PetRepository {

	private JdbcTemplate jdbcTemplate;
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

	private SimpleJdbcInsert insertPet;
	
	@Autowired
	private OwnerRepository ownerRepository;
	
	@Autowired
	private VisitRepository visitRepository;

	private final List<Vet***REMOVED*** vets = new ArrayList<Vet***REMOVED***();


	@Autowired
	public void init(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
		this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);

		this.insertPet = new SimpleJdbcInsert(dataSource)
			.withTableName("pets")
			.usingGeneratedKeyColumns("id");
	***REMOVED***

	@Transactional(readOnly = true)
	public Collection<PetType***REMOVED*** getPetTypes() throws DataAccessException {
		return this.jdbcTemplate.query(
				"SELECT id, name FROM types ORDER BY name",
				ParameterizedBeanPropertyRowMapper.newInstance(PetType.class));
	***REMOVED***

	@Transactional(readOnly = true)
	public Pet findById(int id) throws DataAccessException {
		JdbcPet pet;
		try {
			pet = this.jdbcTemplate.queryForObject(
					"SELECT id, name, birth_date, type_id, owner_id FROM pets WHERE id=?",
					new JdbcPetRowMapper(),
					id);
		***REMOVED***
		catch (EmptyResultDataAccessException ex) {
			throw new ObjectRetrievalFailureException(Pet.class, new Integer(id));
		***REMOVED***
		Owner owner = this.ownerRepository.findById(pet.getOwnerId());
		owner.addPet(pet);
		pet.setType(EntityUtils.getById(getPetTypes(), PetType.class, pet.getTypeId()));
		
		List<Visit***REMOVED*** visits = this.visitRepository.findByPetId(pet.getId());
		for (Visit visit : visits) {
			pet.addVisit(visit);
		***REMOVED***
		return pet;
	***REMOVED***

	@Transactional
	public void storePet(Pet pet) throws DataAccessException {
		if (pet.isNew()) {
			Number newKey = this.insertPet.executeAndReturnKey(
					createPetParameterSource(pet));
			pet.setId(newKey.intValue());
		***REMOVED***
		else {
			this.namedParameterJdbcTemplate.update(
					"UPDATE pets SET name=:name, birth_date=:birth_date, type_id=:type_id, " +
					"owner_id=:owner_id WHERE id=:id",
					createPetParameterSource(pet));
		***REMOVED***
	***REMOVED***

	/**
	 * Creates a {@link MapSqlParameterSource***REMOVED*** based on data values from the
	 * supplied {@link Pet***REMOVED*** instance.
	 */
	private MapSqlParameterSource createPetParameterSource(Pet pet) {
		return new MapSqlParameterSource()
			.addValue("id", pet.getId())
			.addValue("name", pet.getName())
			.addValue("birth_date", pet.getBirthDate())
			.addValue("type_id", pet.getType().getId())
			.addValue("owner_id", pet.getOwner().getId());
	***REMOVED***

	@Override
	public void deletePet(int id) throws DataAccessException {
		// TODO Auto-generated method stub
		
	***REMOVED***


	/**
	 * Loads the {@link Pet***REMOVED*** and {@link Visit***REMOVED*** data for the supplied
	 * {@link Owner***REMOVED***.
	 */




***REMOVED***
