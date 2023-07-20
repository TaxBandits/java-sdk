package com.tin.sdk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TinMatchingRecipientController {

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
     * Navigate to Recipient Request
     * Page Name: /request
     * Method: GET
     **/
    @GetMapping("/request")
    public String request() {
        return "request";
    }

    /**
     * Navigate to TIN Recipient List
     * Page Name: /tinRecipientList
     * Method: GET
     **/
    @GetMapping("/tinRecipientList")
    public String tinRecipientList() {
        return "tinRecipientList";
    }

}
