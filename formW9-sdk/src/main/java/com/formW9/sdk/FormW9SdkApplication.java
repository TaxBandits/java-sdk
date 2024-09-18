package com.formW9.sdk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class FormW9SdkApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(FormW9SdkApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(FormW9SdkApplication.class);
    }

}
