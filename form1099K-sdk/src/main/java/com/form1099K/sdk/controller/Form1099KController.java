package com.form1099K.sdk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Form1099KController {

    /**
     * Navigate to Create Form1099K
     * Page Name: /createOrUpdateForm1099K
     * Method: GET
     **/
    @GetMapping("/createOrUpdateForm1099K")
    public String createOrUpdateForm1099K() {
        return "createOrUpdateForm1099K";
    }

    /**
     * Navigate to Create Form1099K
     * Page Name: /listForm1099K
     * Method: GET
     **/
    @GetMapping("/listForm1099K")
    public String listForm1099K() {
        return "listForm1099K";
    }


}
