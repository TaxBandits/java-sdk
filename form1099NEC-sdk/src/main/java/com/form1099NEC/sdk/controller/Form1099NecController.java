package com.form1099NEC.sdk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Form1099NecController {

    /**
     * Navigate to Create Form1099NEC
     * Page Name: /createOrUpdateForm1099NEC
     * Method: GET
     **/
    @GetMapping("/createOrUpdateForm1099NEC")
    public String createOrUpdateForm1099NEC() {
        return "createOrUpdateForm1099NEC";
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
