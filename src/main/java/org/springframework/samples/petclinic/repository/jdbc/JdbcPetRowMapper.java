package org.springframework.samples.petclinic.repository.jdbc;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.simple.ParameterizedRowMapper;

/**
 * {@link ParameterizedRowMapper***REMOVED*** implementation mapping data from a
 * {@link ResultSet***REMOVED*** to the corresponding properties of the {@link JdbcPet***REMOVED*** class.
 */
class JdbcPetRowMapper implements ParameterizedRowMapper<JdbcPet***REMOVED*** {

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
