/*
 * Copyright 2002-2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.samples.petclinic.repository.jdbc;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.orm.ObjectRetrievalFailureException;
import org.springframework.samples.petclinic.model.Owner;
import org.springframework.samples.petclinic.model.Pet;
import org.springframework.samples.petclinic.model.PetType;
import org.springframework.samples.petclinic.model.Visit;
import org.springframework.samples.petclinic.repository.OwnerRepository;
import org.springframework.samples.petclinic.repository.VisitRepository;
import org.springframework.samples.petclinic.util.EntityUtils;
import org.springframework.stereotype.Repository;

/**
 * A simple JDBC-based implementation of the {@link OwnerRepository***REMOVED*** interface.
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 * @author Rob Harrop
 * @author Sam Brannen
 * @author Thomas Risberg
 * @author Mark Fisher
 */
@Repository
public class JdbcOwnerRepositoryImpl implements OwnerRepository {

    private VisitRepository visitRepository;

    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    private SimpleJdbcInsert insertOwner;

    @Autowired
    public JdbcOwnerRepositoryImpl(DataSource dataSource, NamedParameterJdbcTemplate namedParameterJdbcTemplate,
                                   VisitRepository visitRepository) {

        this.insertOwner = new SimpleJdbcInsert(dataSource)
                .withTableName("owners")
                .usingGeneratedKeyColumns("id");

        this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);

        this.visitRepository = visitRepository;
    ***REMOVED***


    /**
     * Loads {@link Owner Owners***REMOVED*** from the data store by last name, returning all owners whose last name <i***REMOVED***starts</i***REMOVED*** with
     * the given name; also loads the {@link Pet Pets***REMOVED*** and {@link Visit Visits***REMOVED*** for the corresponding owners, if not
     * already loaded.
     */
    @Override
    public Collection<Owner***REMOVED*** findByLastName(String lastName) throws DataAccessException {
        Map<String, Object***REMOVED*** params = new HashMap<String, Object***REMOVED***();
        params.put("lastName", lastName + "%");
        List<Owner***REMOVED*** owners = this.namedParameterJdbcTemplate.query(
                "SELECT id, first_name, last_name, address, city, telephone FROM owners WHERE last_name like :lastName",
                params,
                BeanPropertyRowMapper.newInstance(Owner.class)
        );
        loadOwnersPetsAndVisits(owners);
        return owners;
    ***REMOVED***

    /**
     * Loads the {@link Owner***REMOVED*** with the supplied <code***REMOVED***id</code***REMOVED***; also loads the {@link Pet Pets***REMOVED*** and {@link Visit Visits***REMOVED***
     * for the corresponding owner, if not already loaded.
     */
    @Override
    public Owner findById(int id) throws DataAccessException {
        Owner owner;
        try {
            Map<String, Object***REMOVED*** params = new HashMap<String, Object***REMOVED***();
            params.put("id", id);
            owner = this.namedParameterJdbcTemplate.queryForObject(
                    "SELECT id, first_name, last_name, address, city, telephone FROM owners WHERE id= :id",
                    params,
                    BeanPropertyRowMapper.newInstance(Owner.class)
            );
  ***REMOVED*** catch (EmptyResultDataAccessException ex) {
            throw new ObjectRetrievalFailureException(Owner.class, id);
  ***REMOVED***
        loadPetsAndVisits(owner);
        return owner;
    ***REMOVED***

    public void loadPetsAndVisits(final Owner owner) {
        Map<String, Object***REMOVED*** params = new HashMap<String, Object***REMOVED***();
        params.put("id", owner.getId().intValue());
        final List<JdbcPet***REMOVED*** pets = this.namedParameterJdbcTemplate.query(
                "SELECT pets.id, name, birth_date, type_id, owner_id, visits.id, visit_date, description, pet_id FROM pets LEFT OUTER JOIN visits ON  pets.id = pet_id WHERE owner_id=:id",
                params,
                new JdbcPetVisitExtractor()
        );
        for (JdbcPet pet : pets) {
            owner.addPet(pet);
  ***REMOVED***
    ***REMOVED***

    @Override
    public void save(Owner owner) throws DataAccessException {
        BeanPropertySqlParameterSource parameterSource = new BeanPropertySqlParameterSource(owner);
        if (owner.isNew()) {
            Number newKey = this.insertOwner.executeAndReturnKey(parameterSource);
            owner.setId(newKey.intValue());
  ***REMOVED*** else {
            this.namedParameterJdbcTemplate.update(
                    "UPDATE owners SET first_name=:firstName, last_name=:lastName, address=:address, " +
                            "city=:city, telephone=:telephone WHERE id=:id",
                    parameterSource);
  ***REMOVED***
    ***REMOVED***

    public Collection<PetType***REMOVED*** getPetTypes() throws DataAccessException {
        return this.namedParameterJdbcTemplate.query(
                "SELECT id, name FROM types ORDER BY name", new HashMap<String, Object***REMOVED***(),
                BeanPropertyRowMapper.newInstance(PetType.class));
    ***REMOVED***

    /**
     * Loads the {@link Pet***REMOVED*** and {@link Visit***REMOVED*** data for the supplied {@link List***REMOVED*** of {@link Owner Owners***REMOVED***.
     *
     * @param owners the list of owners for whom the pet and visit data should be loaded
     * @see #loadPetsAndVisits(Owner)
     */
    private void loadOwnersPetsAndVisits(List<Owner***REMOVED*** owners) {
        for (Owner owner : owners) {
            loadPetsAndVisits(owner);
  ***REMOVED***
    ***REMOVED***


***REMOVED***
