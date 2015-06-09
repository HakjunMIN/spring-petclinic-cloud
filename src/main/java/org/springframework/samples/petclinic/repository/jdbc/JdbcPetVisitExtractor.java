/*
 * Copyright 2002-2015 the original author or authors.
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

import org.springframework.data.jdbc.core.OneToManyResultSetExtractor;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.samples.petclinic.model.Visit;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * {@link ResultSetExtractor***REMOVED*** implementation by using the
 * {@link OneToManyResultSetExtractor***REMOVED*** of Spring Data Core JDBC Extensions.
 */
public class JdbcPetVisitExtractor extends
        OneToManyResultSetExtractor<JdbcPet, Visit, Integer***REMOVED*** {

    public JdbcPetVisitExtractor() {
        super(new JdbcPetRowMapper(), new JdbcVisitRowMapper());
    ***REMOVED***

    @Override
    protected Integer mapPrimaryKey(ResultSet rs) throws SQLException {
        return rs.getInt("pets.id");
    ***REMOVED***

    @Override
    protected Integer mapForeignKey(ResultSet rs) throws SQLException {
        if (rs.getObject("visits.pet_id") == null) {
            return null;
  ***REMOVED*** else {
            return rs.getInt("visits.pet_id");
  ***REMOVED***
    ***REMOVED***

    @Override
    protected void addChild(JdbcPet root, Visit child) {
        root.addVisit(child);
    ***REMOVED***
***REMOVED***