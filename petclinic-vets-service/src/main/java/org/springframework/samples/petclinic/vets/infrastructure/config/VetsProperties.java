package org.springframework.samples.petclinic.vets.infrastructure.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Typesafe custom configuration.
 *
 * @author mszarlinski on 2016-11-08.
 */
//TODO: Lombok
@ConfigurationProperties(prefix = "vets")
public class VetsProperties {

    private Cache cache;

    public static class Cache {

        private int ttl;

        private int heapSize;

        public int getTtl() {
            return ttl;
  ***REMOVED***

        public void setTtl(int ttl) {
            this.ttl = ttl;
  ***REMOVED***

        public int getHeapSize() {
            return heapSize;
  ***REMOVED***

        public void setHeapSize(int heapSize) {
            this.heapSize = heapSize;
  ***REMOVED***
    ***REMOVED***

    public Cache getCache() {
        return cache;
    ***REMOVED***

    public void setCache(Cache cache) {
        this.cache = cache;
    ***REMOVED***
***REMOVED***
