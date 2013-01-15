package org.springframework.samples.petclinic.jdbc;

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
import org.springframework.samples.petclinic.Clinic;
import org.springframework.samples.petclinic.Owner;
import org.springframework.samples.petclinic.Pet;
import org.springframework.samples.petclinic.PetType;
import org.springframework.samples.petclinic.Specialty;
import org.springframework.samples.petclinic.Vet;
import org.springframework.samples.petclinic.Visit;
import org.springframework.samples.petclinic.util.EntityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * A simple JDBC-based implementation of the {@link Clinic***REMOVED*** interface.
 *
 * <p***REMOVED***This class uses Java 5 language features and the {@link SimpleJdbcTemplate***REMOVED***
 * plus {@link SimpleJdbcInsert***REMOVED***. It also takes advantage of classes like
 * {@link BeanPropertySqlParameterSource***REMOVED*** and
 * {@link ParameterizedBeanPropertyRowMapper***REMOVED*** which provide automatic mapping
 * between JavaBean properties and JDBC parameters or query results.
 *
 * <p***REMOVED***JdbcClinicImpl is a rewrite of the AbstractJdbcClinic which was the base
 * class for JDBC implementations of the Clinic interface for Spring 2.0.
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 * @author Rob Harrop
 * @author Sam Brannen
 * @author Thomas Risberg
 * @author Mark Fisher
 */
@Service
@ManagedResource("petclinic:type=Clinic")
public class JdbcClinicImpl implements Clinic, JdbcClinicImplMBean {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	private JdbcTemplate jdbcTemplate;
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

	private SimpleJdbcInsert insertOwner;
	private SimpleJdbcInsert insertPet;
	private SimpleJdbcInsert insertVisit;

	private final List<Vet***REMOVED*** vets = new ArrayList<Vet***REMOVED***();


	@Autowired
	public void init(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
		this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);

		this.insertOwner = new SimpleJdbcInsert(dataSource)
			.withTableName("owners")
			.usingGeneratedKeyColumns("id");
		this.insertPet = new SimpleJdbcInsert(dataSource)
			.withTableName("pets")
			.usingGeneratedKeyColumns("id");
		this.insertVisit = new SimpleJdbcInsert(dataSource)
			.withTableName("visits")
			.usingGeneratedKeyColumns("id");
	***REMOVED***


	/**
	 * Refresh the cache of Vets that the Clinic is holding.
	 * @see org.springframework.samples.petclinic.Clinic#getVets()
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


	// START of Clinic implementation section *******************************

	@Transactional(readOnly = true)
	public Collection<Vet***REMOVED*** getVets() throws DataAccessException {
		synchronized (this.vets) {
			if (this.vets.isEmpty()) {
				refreshVetsCache();
			***REMOVED***
			return this.vets;
		***REMOVED***
	***REMOVED***

	@Transactional(readOnly = true)
	public Collection<PetType***REMOVED*** getPetTypes() throws DataAccessException {
		return this.jdbcTemplate.query(
				"SELECT id, name FROM types ORDER BY name",
				ParameterizedBeanPropertyRowMapper.newInstance(PetType.class));
	***REMOVED***

	/**
	 * Loads {@link Owner Owners***REMOVED*** from the data store by last name, returning
	 * all owners whose last name <i***REMOVED***starts</i***REMOVED*** with the given name; also loads
	 * the {@link Pet Pets***REMOVED*** and {@link Visit Visits***REMOVED*** for the corresponding
	 * owners, if not already loaded.
	 */
	@Transactional(readOnly = true)
	public Collection<Owner***REMOVED*** findOwners(String lastName) throws DataAccessException {
		List<Owner***REMOVED*** owners = this.jdbcTemplate.query(
				"SELECT id, first_name, last_name, address, city, telephone FROM owners WHERE last_name like ?",
				ParameterizedBeanPropertyRowMapper.newInstance(Owner.class),
				lastName + "%");
		loadOwnersPetsAndVisits(owners);
		return owners;
	***REMOVED***

	/**
	 * Loads the {@link Owner***REMOVED*** with the supplied <code***REMOVED***id</code***REMOVED***; also loads
	 * the {@link Pet Pets***REMOVED*** and {@link Visit Visits***REMOVED*** for the corresponding
	 * owner, if not already loaded.
	 */
	@Transactional(readOnly = true)
	public Owner findOwner(int id) throws DataAccessException {
		Owner owner;
		try {
			owner = this.jdbcTemplate.queryForObject(
					"SELECT id, first_name, last_name, address, city, telephone FROM owners WHERE id=?",
					ParameterizedBeanPropertyRowMapper.newInstance(Owner.class),
					id);
		***REMOVED***
		catch (EmptyResultDataAccessException ex) {
			throw new ObjectRetrievalFailureException(Owner.class, new Integer(id));
		***REMOVED***
		loadPetsAndVisits(owner);
		return owner;
	***REMOVED***

	@Transactional(readOnly = true)
	public Pet findPet(int id) throws DataAccessException {
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
		Owner owner = findOwner(pet.getOwnerId());
		owner.addPet(pet);
		pet.setType(EntityUtils.getById(getPetTypes(), PetType.class, pet.getTypeId()));
		loadVisits(pet);
		return pet;
	***REMOVED***

	@Transactional
	public void storeOwner(Owner owner) throws DataAccessException {
		if (owner.isNew()) {
			Number newKey = this.insertOwner.executeAndReturnKey(
					new BeanPropertySqlParameterSource(owner));
			owner.setId(newKey.intValue());
		***REMOVED***
		else {
			this.namedParameterJdbcTemplate.update(
					"UPDATE owners SET first_name=:firstName, last_name=:lastName, address=:address, " +
					"city=:city, telephone=:telephone WHERE id=:id",
					new BeanPropertySqlParameterSource(owner));
		***REMOVED***
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

	@Transactional
	public void storeVisit(Visit visit) throws DataAccessException {
		if (visit.isNew()) {
			Number newKey = this.insertVisit.executeAndReturnKey(
					createVisitParameterSource(visit));
			visit.setId(newKey.intValue());
		***REMOVED***
		else {
			throw new UnsupportedOperationException("Visit update not supported");
		***REMOVED***
	***REMOVED***

	public void deletePet(int id) throws DataAccessException {
		this.jdbcTemplate.update("DELETE FROM pets WHERE id=?", id);
	***REMOVED***

	// END of Clinic implementation section ************************************


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

	/**
	 * Creates a {@link MapSqlParameterSource***REMOVED*** based on data values from the
	 * supplied {@link Visit***REMOVED*** instance.
	 */
	private MapSqlParameterSource createVisitParameterSource(Visit visit) {
		return new MapSqlParameterSource()
			.addValue("id", visit.getId())
			.addValue("visit_date", visit.getDate())
			.addValue("description", visit.getDescription())
			.addValue("pet_id", visit.getPet().getId());
	***REMOVED***

	/**
	 * Loads the {@link Visit***REMOVED*** data for the supplied {@link Pet***REMOVED***.
	 */
	private void loadVisits(JdbcPet pet) {
		final List<Visit***REMOVED*** visits = this.jdbcTemplate.query(
				"SELECT id, visit_date, description FROM visits WHERE pet_id=?",
				new ParameterizedRowMapper<Visit***REMOVED***() {
					public Visit mapRow(ResultSet rs, int row) throws SQLException {
						Visit visit = new Visit();
						visit.setId(rs.getInt("id"));
						visit.setDate(rs.getTimestamp("visit_date"));
						visit.setDescription(rs.getString("description"));
						return visit;
					***REMOVED***
				***REMOVED***,
				pet.getId().intValue());
		for (Visit visit : visits) {
			pet.addVisit(visit);
		***REMOVED***
	***REMOVED***

	/**
	 * Loads the {@link Pet***REMOVED*** and {@link Visit***REMOVED*** data for the supplied
	 * {@link Owner***REMOVED***.
	 */
	private void loadPetsAndVisits(final Owner owner) {
		final List<JdbcPet***REMOVED*** pets = this.jdbcTemplate.query(
				"SELECT id, name, birth_date, type_id, owner_id FROM pets WHERE owner_id=?",
				new JdbcPetRowMapper(),
				owner.getId().intValue());
		for (JdbcPet pet : pets) {
			owner.addPet(pet);
			pet.setType(EntityUtils.getById(getPetTypes(), PetType.class, pet.getTypeId()));
			loadVisits(pet);
		***REMOVED***
	***REMOVED***

	/**
	 * Loads the {@link Pet***REMOVED*** and {@link Visit***REMOVED*** data for the supplied
	 * {@link List***REMOVED*** of {@link Owner Owners***REMOVED***.
	 *
	 * @param owners the list of owners for whom the pet and visit data should be loaded
	 * @see #loadPetsAndVisits(Owner)
	 */
	private void loadOwnersPetsAndVisits(List<Owner***REMOVED*** owners) {
		for (Owner owner : owners) {
			loadPetsAndVisits(owner);
		***REMOVED***
	***REMOVED***

	/**
	 * {@link ParameterizedRowMapper***REMOVED*** implementation mapping data from a
	 * {@link ResultSet***REMOVED*** to the corresponding properties of the {@link JdbcPet***REMOVED*** class.
	 */
	private class JdbcPetRowMapper implements ParameterizedRowMapper<JdbcPet***REMOVED*** {

		public JdbcPet mapRow(ResultSet rs, int rownum) throws SQLException {
			JdbcPet pet = new JdbcPet();
			pet.setId(rs.getInt("id"));
			pet.setName(rs.getString("name"));
			pet.setBirthDate(rs.getDate("birth_date"));
			pet.setTypeId(rs.getInt("type_id"));
			pet.setOwnerId(rs.getInt("owner_id"));
			return pet;
		***REMOVED***
	***REMOVED***

***REMOVED***
