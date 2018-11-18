package org.springframework.samples.petclinic.dashboard;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.hystrix.dashboard.EnableHystrixDashboard;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

***REMOVED***
@EnableDiscoveryClient
@EnableHystrixDashboard
@Controller
public class HystrixDashboardApplication {

    public static void main(String[] args) {
        SpringApplication.run(HystrixDashboardApplication.class, args);
    ***REMOVED***

    @RequestMapping("/")
    public String home() {
        return "forward:/hystrix";
    ***REMOVED***
***REMOVED***
