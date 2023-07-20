package com.tin.sdk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class TinMatchingRecipientsSdkApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(TinMatchingRecipientsSdkApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(TinMatchingRecipientsSdkApplication.class, args);
    }

}
