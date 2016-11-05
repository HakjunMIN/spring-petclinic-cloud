package org.springframework.samples.petclinic.vets.infrastructure.config;

import org.ehcache.config.CacheConfiguration;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.config.units.EntryUnit;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

/**
 * Cache could be disable in unit test.
 */
@Configuration
@EnableCaching
public class CacheConfig {

    @Value("${vets.cache.ttl}")
    private int cacheTtl;

    @Value("${vets.cache.heap-size}")
    private int cacheHeapSize;

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cacheManager -> {
            CacheConfiguration<Object, Object> config = CacheConfigurationBuilder
                .newCacheConfigurationBuilder(Object.class, Object.class,
                    ResourcePoolsBuilder.newResourcePoolsBuilder()
                        .heap(cacheHeapSize, EntryUnit.ENTRIES))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(cacheTtl, TimeUnit.SECONDS)))
                .build();
            cacheManager.createCache("vets", Eh107Configuration.fromEhcacheCacheConfiguration(config));
        };
    }

}
