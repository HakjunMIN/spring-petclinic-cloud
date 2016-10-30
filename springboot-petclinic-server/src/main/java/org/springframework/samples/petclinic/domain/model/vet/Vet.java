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
package org.springframework.samples.petclinic.domain.model.vet;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlElement;

import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PropertyComparator;
import org.springframework.samples.petclinic.domain.shared.Person;

/**
 * Simple JavaBean domain object representing a veterinarian.
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 * @author Sam Brannen
 * @author Arjen Poutsma
 */
@Entity
@Table(name = "vets")
public class Vet extends Person {

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "vet_specialties", joinColumns = @JoinColumn(name = "vet_id"),
            inverseJoinColumns = @JoinColumn(name = "specialty_id"))
    private Set<Specialty***REMOVED*** specialties;


    protected void setSpecialtiesInternal(Set<Specialty***REMOVED*** specialties) {
        this.specialties = specialties;
    ***REMOVED***

    protected Set<Specialty***REMOVED*** getSpecialtiesInternal() {
        if (this.specialties == null) {
            this.specialties = new HashSet<***REMOVED***();
  ***REMOVED***
        return this.specialties;
    ***REMOVED***

    @XmlElement
    public List<Specialty***REMOVED*** getSpecialties() {
        List<Specialty***REMOVED*** sortedSpecs = new ArrayList<***REMOVED***(getSpecialtiesInternal());
        PropertyComparator.sort(sortedSpecs, new MutableSortDefinition("name", true, true));
        return Collections.unmodifiableList(sortedSpecs);
    ***REMOVED***

    public int getNrOfSpecialties() {
        return getSpecialtiesInternal().size();
    ***REMOVED***

    public void addSpecialty(Specialty specialty) {
        getSpecialtiesInternal().add(specialty);
    ***REMOVED***

***REMOVED***
