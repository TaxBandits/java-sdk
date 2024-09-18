package com.boir.sdk.controller.rest_controller;

import com.boir.sdk.model.business.BusinessListResponse;
import com.boir.sdk.model.business.CreateBusinessRequest;
import com.boir.sdk.model.business.CreateBusinessResponse;
import com.boir.sdk.retrofit.RetrofitResponse;
import com.boir.sdk.retrofit.services.business.BusinessListService;
import com.boir.sdk.retrofit.services.business.CreateBusinessService;
import jakarta.servlet.http.HttpServletRequest;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BusinessRestController {

    /**
     * Get Business list from API
     * Endpoint: /businessList
     * Method: GET
     **/
    @GetMapping("/businessList")
    public RetrofitResponse<BusinessListResponse> getBusinessList(HttpServletRequest httpServletRequest) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return BusinessListService.businessList(jwtToken);
    }

    /**
     * Create a business using the API
     * Endpoint: /createBusiness
     * Method: POST
     * Parameters: CreateBusinessRequest() // Model should be NotNull
     **/
    @PostMapping("/createBusiness")
    public RetrofitResponse<CreateBusinessResponse> createBusiness(HttpServletRequest httpServletRequest, @NotNull @RequestBody CreateBusinessRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return CreateBusinessService.createBusiness(jwtToken, request);
    }

}
