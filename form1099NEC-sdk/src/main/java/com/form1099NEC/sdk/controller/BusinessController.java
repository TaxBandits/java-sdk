package com.form1099NEC.sdk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BusinessController {

    /**
     * Navigate to Create Business
     * Page Name: /createBusiness
     * Method: GET
     **/
    @GetMapping("/createBusiness")
    public String createBusiness() {
        return "createBusiness";
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
