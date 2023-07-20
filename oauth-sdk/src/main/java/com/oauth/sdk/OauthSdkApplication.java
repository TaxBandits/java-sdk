package com.oauth.sdk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class OauthSdkApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(OauthSdkApplication.class, args);
    }

    /**
     * "Servlet" web configuration by "SpringApplicationBuilder"
     **/
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(OauthSdkApplication.class);
    }
}
