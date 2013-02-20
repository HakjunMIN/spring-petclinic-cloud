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

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.*;

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
    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    @DateTimeFormat(pattern = "yyyy/MM/dd")
    private DateTime birthDate;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private PetType type;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private Owner owner;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "pet", fetch = FetchType.EAGER)
    private Set<Visit***REMOVED*** visits;


    public void setBirthDate(DateTime birthDate) {
        this.birthDate = birthDate;
    ***REMOVED***

    public DateTime getBirthDate() {
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
