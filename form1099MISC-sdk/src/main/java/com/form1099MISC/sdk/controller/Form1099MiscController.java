package com.form1099MISC.sdk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Form1099MiscController {

    /**
     * Navigate to Create Form1099MISC
     * Page Name: /createOrUpdateForm1099MISC
     * Method: GET
     **/
    @GetMapping("/createOrUpdateForm1099MISC")
    public String createOrUpdateForm1099MISC() {
        return "createOrUpdateForm1099MISC";
    }

    /**
     * Navigate to Create Form1099MISC
     * Page Name: /listForm1099MISC
     * Method: GET
     **/
    @GetMapping("/listForm1099MISC")
    public String listForm1099MISC() {
        return "listForm1099MISC";
    }


}
