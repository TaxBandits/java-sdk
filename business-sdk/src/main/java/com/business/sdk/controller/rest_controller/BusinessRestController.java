package com.business.sdk.controller.rest_controller;

import com.business.sdk.controller.model.GetBusinessRequest;
import com.business.sdk.model.BusinessListResponse;
import com.business.sdk.model.CreateBusinessRequest;
import com.business.sdk.model.CreateBusinessResponse;
import com.business.sdk.model.GetBusinessResponse;
import com.business.sdk.retrofit.RetrofitResponse;
import com.business.sdk.retrofit.services.UpdateBusinessService;
import com.business.sdk.retrofit.services.BusinessListService;
import com.business.sdk.retrofit.services.CreateBusinessService;
import com.business.sdk.retrofit.services.GetBusinessService;
import com.business.sdk.utils.StringUtils;
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
    @GetMapping(path = "/businessList")
    public RetrofitResponse<BusinessListResponse> businessList(HttpServletRequest request) {
        String jwtToken = new OauthRestController().readJwt(request);
        if (StringUtils.isValidString(jwtToken))
            return BusinessListService.businessList(jwtToken);
        else return new RetrofitResponse<>();
    }

    /**
     * Create a business using the API
     * Endpoint: /createBusiness
     * Method: POST
     * Parameters: CreateBusinessRequest() // Model should be NotNull
     **/
    @PostMapping(path = "/createBusiness")
    public RetrofitResponse<CreateBusinessResponse> createBusiness(HttpServletRequest httpServletRequest, @NotNull @RequestBody CreateBusinessRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return CreateBusinessService.createBusiness(jwtToken, request);
    }

    /**
     * Update a business into the API
     * Endpoint: /updateBusiness
     * Method: POST
     * Parameters: CreateBusinessRequest() // Model should be NotNull
     **/
    @PostMapping(path = "/updateBusiness")
    public RetrofitResponse<CreateBusinessResponse> updateBusiness(HttpServletRequest httpServletRequest, @NotNull @RequestBody CreateBusinessRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return UpdateBusinessService.updateBusiness(jwtToken, request);
    }

    /**
     * Get a business details by BusinessId from API
     * Endpoint: /getBusiness
     * Method: POST
     * Parameters: GetBusinessRequest() // Model should be NotNull
     **/
    @PostMapping(path = "/getBusiness")
    public RetrofitResponse<GetBusinessResponse> getBusiness(HttpServletRequest httpServletRequest, @NotNull @RequestBody GetBusinessRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return GetBusinessService.getBusiness(jwtToken, request);
    }

}
