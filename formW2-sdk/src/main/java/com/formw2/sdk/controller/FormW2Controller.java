package com.formw2.sdk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FormW2Controller {

    /**
     * Navigate to Create or Update FromW2
     * Page Name: /createOrUpdateFormW2
     * Method: GET
     **/
    @GetMapping("/createOrUpdateFormW2")
    public String createOrUpdateFormW2() {
        return "createOrUpdateFormW2";
    }

    /**
     * Navigate to FromW2  List
     * Page Name: /listFormW2
     * Method: GET
     **/
    @GetMapping("/listFormW2")
    public String listFormW2() {
        return "listFormW2";
    }

}
