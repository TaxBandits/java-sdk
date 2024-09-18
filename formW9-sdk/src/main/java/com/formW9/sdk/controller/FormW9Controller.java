package com.formW9.sdk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FormW9Controller {

    /**
     * Navigate to Create FormW9
     * Page Name: /createFormW9
     * Method: GET
     **/
    @GetMapping("/createFormW9")
    public String createFormW9() {
        return "createFormW9";
    }

    /**
     * Navigate to Create FormW9
     * Page Name: /listFormW9
     * Method: GET
     **/
    @GetMapping("/listFormW9")
    public String listFormW9() {
        return "listFormW9";
    }

    /**
     * Navigate to FormW9 Request by Email
     * Page Name: /requestByEmail
     * Method: GET
     **/
    @GetMapping("/requestByEmail")
    public String requestByEmail() {
        return "requestByEmail";
    }

    /**
     * Navigate to FormW9 Request by URL
     * Page Name: /listFormW9
     * Method: GET
     **/
    @GetMapping("/requestByUrl")
    public String requestByUrl() {
        return "requestByUrl";
    }

    /**
     * Navigate to Payee SignUp page
     * Page Name: /payeeSignUp
     * Method: GET
     **/
    @GetMapping("/payeeSignUp")
    public String payeeSignUp() {
        return "payeeSignUp";
    }


    /**
     * Navigate to Payee OnBoard
     * Page Name: /onBoard
     * Method: GET
     **/
    @GetMapping("/onBoard")
    public String onBoard() {
        return "onBoard";
    }


}
