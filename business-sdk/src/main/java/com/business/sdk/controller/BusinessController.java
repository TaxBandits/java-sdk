package com.business.sdk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BusinessController {

    /**
     * Navigate to Home
     * Page Name: /
     * Method: GET
     **/
    @GetMapping("/")
    public String welcome() {
        return "home";
    }

    /**
     * Navigate to Home
     * Page Name: /home
     * Method: GET
     **/
    @GetMapping("/home")
    public String home() {
        return "home";
    }

    /**
     * Navigate to Create Business
     * Page Name: /createOrUpdateBusiness
     * Method: GET
     **/
    @GetMapping("/createOrUpdateBusiness")
    public String createOrUpdateBusiness() {
        return "createOrUpdateBusiness";
    }

    /**
     * Navigate to Business List
     * Page Name: /listBusiness
     * Method: GET
     **/
    @GetMapping("/listBusiness")
    public String listBusiness() {
        return "listBusiness";
    }

}
