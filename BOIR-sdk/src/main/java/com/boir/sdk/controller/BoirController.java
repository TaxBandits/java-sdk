package com.boir.sdk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BoirController {

    /**
     * Navigate to Create BOIR Create
     * Page Name: /createBOIR
     * Method: GET
     **/
    @GetMapping("/createBOIR")
    public String createBOIR() {
        return "createBOIR";
    }

    @GetMapping("/viewBOIR")
    public String viewBOIR() {
        return "viewBOIR";
    }

}
