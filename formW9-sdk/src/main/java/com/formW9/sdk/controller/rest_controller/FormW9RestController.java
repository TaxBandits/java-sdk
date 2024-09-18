package com.formW9.sdk.controller.rest_controller;

import com.formW9.sdk.controller.model.BusinessIdRequest;
import com.formW9.sdk.controller.model.PayeeRefRequest;
import com.formW9.sdk.model.*;
import com.formW9.sdk.retrofit.RetrofitResponse;
import com.formW9.sdk.retrofit.services.FormW9GetService;
import com.formW9.sdk.retrofit.services.FormW9ListService;
import com.formW9.sdk.retrofit.services.RequestByEmailService;
import com.formW9.sdk.retrofit.services.RequestByUrlService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FormW9RestController {

    /**
     * Get FormW9 List from API
     * Endpoint: /formW9List
     * Method: POST
     * Parameters: BusinessIdRequest() // Model should be NotNull
     **/
    @PostMapping("/formW9List")
    public RetrofitResponse<FormW9ListResponse> formW9List(HttpServletRequest httpServletRequest, @RequestBody BusinessIdRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return FormW9ListService.formW9List(jwtToken, request.getBusinessId());
    }

    /**
     * Request by URL from API
     * Endpoint: /formW9RequestByEmail
     * Method: POST
     **/
    @PostMapping("/formW9RequestByEmail")
    public RetrofitResponse<RequestByEmailResponse> formW9RequestByEmail(HttpServletRequest httpServletRequest, @RequestBody RequestByEmailRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        SubmissionManifest submissionManifest = new SubmissionManifest();
        submissionManifest.setIsTINMatching(true);
        request.setSubmissionManifest(submissionManifest);
        return RequestByEmailService.requestByEmail(jwtToken, request);
    }

    /**
     * Request by URL from API
     * Endpoint: /formW9RequestByUrl
     * Method: POST
     **/
    @PostMapping("/formW9RequestByUrl")
    public RetrofitResponse<RequestByUrlResponse> formW9RequestByUrl(HttpServletRequest httpServletRequest, @RequestBody RequestByUrlRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        Recipient recipient = request.getRecipient();
        recipient.setIsTINMatching(true);
        request.setRecipient(recipient);
        return RequestByUrlService.requestByUrl(jwtToken, request);
    }

    /**
     * Request by URL from API
     * Endpoint: /formW9Get
     * Method: POST
     **/
    @PostMapping("/formW9Get")
    public RetrofitResponse<FormW9GetResponse> formW9Get(HttpServletRequest httpServletRequest, @RequestBody PayeeRefRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return FormW9GetService.formW9Get(jwtToken, request);
    }

}
