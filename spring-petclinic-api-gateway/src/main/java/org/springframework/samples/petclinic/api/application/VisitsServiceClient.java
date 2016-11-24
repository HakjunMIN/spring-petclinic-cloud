package org.springframework.samples.petclinic.api.application;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.groupingBy;

/**
 * @author Maciej Szarlinski
 */
@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class VisitsServiceClient {

    private final RestTemplate loadBalancedRestTemplate;

    public Map<Integer, List<VisitDetails***REMOVED******REMOVED*** getVisitsForPets(final List<Integer***REMOVED*** petIds, final int ownerId) {
        //TODO:  expose batch interface in Visit Service
        final ParameterizedTypeReference<List<VisitDetails***REMOVED******REMOVED*** responseType = new ParameterizedTypeReference<List<VisitDetails***REMOVED******REMOVED***() {
  ***REMOVED***;
        return petIds.parallelStream()
            .flatMap(petId -***REMOVED*** loadBalancedRestTemplate.exchange("http://visits-service/owners/{ownerId***REMOVED***/pets/{petId***REMOVED***/visits", HttpMethod.GET, null,
                responseType, ownerId, petId).getBody().stream())
            .collect(groupingBy(VisitDetails::getPetId));
    ***REMOVED***
***REMOVED***
