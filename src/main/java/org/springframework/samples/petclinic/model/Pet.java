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
package org.springframework.samples.petclinic.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PropertyComparator;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Simple business object representing a pet.
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 * @author Sam Brannen
 */
@Entity
@Table(name = "pets")
public class Pet extends NamedEntity {

    @Column(name = "birth_date")
    @Temporal(TemporalType.DATE)
    private Date birthDate;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private PetType type;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    @JsonIgnore
    private Owner owner;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pet", fetch = FetchType.EAGER)
    private Set<Visit***REMOVED*** visits;


    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    ***REMOVED***

    public Date getBirthDate() {
        return this.birthDate;
    ***REMOVED***

    public void setType(PetType type) {
        this.type = type;
    ***REMOVED***

    public PetType getType() {
        return this.type;
    ***REMOVED***

    protected void setOwner(Owner owner) {
        this.owner = owner;
    ***REMOVED***

    public Owner getOwner() {
        return this.owner;
    ***REMOVED***

    protected void setVisitsInternal(Set<Visit***REMOVED*** visits) {
        this.visits = visits;
    ***REMOVED***

    protected Set<Visit***REMOVED*** getVisitsInternal() {
        if (this.visits == null) {
            this.visits = new HashSet<Visit***REMOVED***();
  ***REMOVED***
        return this.visits;
    ***REMOVED***

    public List<Visit***REMOVED*** getVisits() {
        List<Visit***REMOVED*** sortedVisits = new ArrayList<Visit***REMOVED***(getVisitsInternal());
        PropertyComparator.sort(sortedVisits, new MutableSortDefinition("date", false, false));
        return Collections.unmodifiableList(sortedVisits);
    ***REMOVED***

    public void addVisit(Visit visit) {
        getVisitsInternal().add(visit);
        visit.setPet(this);
    ***REMOVED***

***REMOVED***
