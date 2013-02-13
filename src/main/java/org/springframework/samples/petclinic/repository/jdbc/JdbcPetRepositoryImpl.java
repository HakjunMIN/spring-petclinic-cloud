package org.springframework.samples.petclinic.repository.jdbc;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.ParameterizedBeanPropertyRowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.orm.ObjectRetrievalFailureException;
import org.springframework.samples.petclinic.model.Owner;
import org.springframework.samples.petclinic.model.Pet;
import org.springframework.samples.petclinic.model.PetType;
import org.springframework.samples.petclinic.model.Visit;
import org.springframework.samples.petclinic.repository.OwnerRepository;
import org.springframework.samples.petclinic.repository.PetRepository;
import org.springframework.samples.petclinic.repository.VisitRepository;
import org.springframework.samples.petclinic.util.EntityUtils;
import org.springframework.stereotype.Repository;

/**
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

	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

	private SimpleJdbcInsert insertPet;
	
	private OwnerRepository ownerRepository;
	
	private VisitRepository visitRepository;
	

	@Autowired
	public JdbcPetRepositoryImpl(DataSource dataSource, OwnerRepository ownerRepository, VisitRepository visitRepository) {
		this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);

		this.insertPet = new SimpleJdbcInsert(dataSource)
			.withTableName("pets")
			.usingGeneratedKeyColumns("id");
		
		this.ownerRepository = ownerRepository;
		this.visitRepository = visitRepository;
	***REMOVED***

	public List<PetType***REMOVED*** findPetTypes() throws DataAccessException {
		Map<String, Object***REMOVED*** params = new HashMap<String,Object***REMOVED***();
		return this.namedParameterJdbcTemplate.query(
				"SELECT id, name FROM types ORDER BY name",
				params,
				ParameterizedBeanPropertyRowMapper.newInstance(PetType.class));
	***REMOVED***

	public Pet findById(int id) throws DataAccessException {
		JdbcPet pet;
		try {
			Map<String, Object***REMOVED*** params = new HashMap<String, Object***REMOVED***();
			params.put("id", id);
			pet = this.namedParameterJdbcTemplate.queryForObject(
					"SELECT id, name, birth_date, type_id, owner_id FROM pets WHERE id=:id",
					params,
					new JdbcPetRowMapper());
		***REMOVED***
		catch (EmptyResultDataAccessException ex) {
			throw new ObjectRetrievalFailureException(Pet.class, new Integer(id));
		***REMOVED***
		Owner owner = this.ownerRepository.findById(pet.getOwnerId());
		owner.addPet(pet);
		pet.setType(EntityUtils.getById(findPetTypes(), PetType.class, pet.getTypeId()));
		
		List<Visit***REMOVED*** visits = this.visitRepository.findByPetId(pet.getId());
		for (Visit visit : visits) {
			pet.addVisit(visit);
		***REMOVED***
		return pet;
	***REMOVED***

	public void save(Pet pet) throws DataAccessException {
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
			.addValue("birth_date", pet.getBirthDate().toDate())
			.addValue("type_id", pet.getType().getId())
			.addValue("owner_id", pet.getOwner().getId());
	***REMOVED***

***REMOVED***
