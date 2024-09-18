package com.wh_certificate.sdk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Form1099NecController {

    /**
     * Navigate to Create Form1099NEC
     * Page Name: /createForm1099NEC
     * Method: GET
     **/
    @GetMapping("/createForm1099NEC")
    public String createForm1099NEC() {
        return "createForm1099NEC";
    }

    /**
     * Navigate to Create Form1099NEC
     * Page Name: /listForm1099NEC
     * Method: GET
     **/
    @GetMapping("/listForm1099NEC")
    public String listForm1099NEC() {
        return "listForm1099NEC";
    }


}
