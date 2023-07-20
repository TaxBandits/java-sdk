package com.oauth.sdk.controller;

import com.oauth.sdk.controller.model.ApiCredentialModel;
import com.oauth.sdk.controller.model.JwsModel;
import com.oauth.sdk.controller.model.JwtModel;
import com.oauth.sdk.model.AccessTokenResponse;
import com.oauth.sdk.model.BusinessListResponse;
import com.oauth.sdk.model.CreateBusinessRequest;
import com.oauth.sdk.model.CreateBusinessResponse;
import com.oauth.sdk.retrofit.RetrofitResponse;
import com.oauth.sdk.retrofit.services.BusinessList;
import com.oauth.sdk.retrofit.services.CreateBusiness;
import com.oauth.sdk.retrofit.services.TbsOauth;
import com.oauth.sdk.utils.JwsUtils;
import com.oauth.sdk.utils.JwtUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OauthRestController {

    /**
     * Generate JWS token using HMAC algorithm
     * Endpoint: /generateJws
     * Method: POST
     * Parameters: ApiCredentialModel(
     * String clientId,
     * String userToken,
     * String clientSecret
     * ) // Model should be NotNull
     **/
    @PostMapping(path = "/generateJws")
    public String generateJws(@NotNull @RequestBody ApiCredentialModel apiCredentialModel) {
        String payload = JwsUtils.getPayload(apiCredentialModel.getClientId(), apiCredentialModel.getUserToken());
        return JwtUtils.getJwtToken(payload, apiCredentialModel.getClientSecret());
    }

    /**
     * Get JWT token from API
     * Endpoint: /getJwt
     * Method: POST
     * Parameters: JwsModel(String jwsToken) // Model should be NotNull
     **/
    @PostMapping(path = "/getJwt")
    public RetrofitResponse<AccessTokenResponse> getJwt(@NotNull @RequestBody JwsModel jwsModel) {
        return TbsOauth.tbsAuth(jwsModel.getJwsToken());
    }

    /**
     * Get Business list from API
     * Endpoint: /businessList
     * Method: POST
     * Parameters: JwtModel(String jwtToken) // Model should be NotNull
     **/
    @PostMapping(path = "/businessList")
    public RetrofitResponse<BusinessListResponse> businessList(@NotNull @RequestBody JwtModel jwtModel) {
        return BusinessList.businessList(jwtModel.getJwtToken());
    }

    /**
     * Create a business using the API
     * Endpoint: /createBusiness
     * Method: POST
     * Parameters: CreateBusinessRequest() // Model should be NotNull
     **/
    @PostMapping(path = "/createBusiness")
    public CreateBusinessResponse createBusiness(@NotNull @RequestBody CreateBusinessRequest request) {
        return CreateBusiness.createBusiness(request).getData();
    }

}
