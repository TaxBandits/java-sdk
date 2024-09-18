package com.wh_certificate.sdk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class WhCertificateSdkApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(WhCertificateSdkApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(WhCertificateSdkApplication.class);
    }

}
