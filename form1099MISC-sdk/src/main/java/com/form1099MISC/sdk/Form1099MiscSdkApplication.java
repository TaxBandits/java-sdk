package com.form1099MISC.sdk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class Form1099MiscSdkApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(Form1099MiscSdkApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Form1099MiscSdkApplication.class);
    }

}
