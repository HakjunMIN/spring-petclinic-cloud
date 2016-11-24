package org.springframework.samples.petclinic.customers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Import;
import org.springframework.samples.petclinic.monitoring.MonitoringConfig;

/**
 * @author Maciej Szarlinski
 */
@EnableDiscoveryClient
***REMOVED***
@Import(MonitoringConfig.class)
public class CustomersServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CustomersServiceApplication.class, args);
	***REMOVED***
***REMOVED***
