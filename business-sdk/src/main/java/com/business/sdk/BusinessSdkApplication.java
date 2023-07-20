package com.business.sdk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class BusinessSdkApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(BusinessSdkApplication.class, args);
    }

    /**
     * "Servlet" web configuration by "SpringApplicationBuilder"
     **/
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(BusinessSdkApplication.class);
    }

}
