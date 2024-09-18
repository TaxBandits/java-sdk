package com.form1099K.sdk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class Form1099KSdkApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(Form1099KSdkApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Form1099KSdkApplication.class);
    }

}
