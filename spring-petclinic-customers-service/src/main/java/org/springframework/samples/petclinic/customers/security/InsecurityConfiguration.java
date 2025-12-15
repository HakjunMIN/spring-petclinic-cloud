package org.springframework.samples.petclinic.customers.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class InsecurityConfiguration {

    private final static Logger log = LoggerFactory.getLogger(InsecurityConfiguration.class);

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        log.warn("configuring insecure HttpSecurity");
        http
        	.authorizeHttpRequests(authz -> authz
        		.anyRequest().permitAll()
        	)
        	.httpBasic(basic -> basic.disable())
        	.csrf(csrf -> csrf.disable());
        return http.build();
    }

}
