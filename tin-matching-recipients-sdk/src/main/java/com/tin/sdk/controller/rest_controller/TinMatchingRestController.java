package com.tin.sdk.controller.rest_controller;

import com.tin.sdk.controller.model.CancelRequest;
import com.tin.sdk.controller.model.StatusRequest;
import com.tin.sdk.model.*;
import com.tin.sdk.retrofit.RetrofitResponse;
import com.tin.sdk.retrofit.services.CancelRequestService;
import com.tin.sdk.retrofit.services.StatusService;
import com.tin.sdk.retrofit.services.TinListService;
import com.tin.sdk.retrofit.services.TinRequestService;
import jakarta.servlet.http.HttpServletRequest;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TinMatchingRestController {

    /**
     * Create TIN Request using API
     * Endpoint: /createTinRequest
     * Method: POST
     * Parameters: TINMatchingDetails() // Model should be NotNull
     **/
    @PostMapping(path = "/createTinRequest")
    public RetrofitResponse<TinResponse> createTinRequest(
            HttpServletRequest httpServletRequest,
            @NotNull @RequestBody TINMatchingDetails tinMatchingDetails
    ) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        TinRequest request = new TinRequest(tinMatchingDetails);
        return TinRequestService.createTinRequest(jwtToken, request);
    }

    /**
     * Get TIN Recipient List from API
     * Endpoint: /getTinRecipientList
     * Method: POST
     * Parameters: Business() // Model should be NotNull
     **/
    @PostMapping(path = "/tinRecipientList")
    public RetrofitResponse<TinListResponse> tinRecipientList(
            HttpServletRequest httpServletRequest,
            @NotNull @RequestBody Business business
    ) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return TinListService.getTinList(jwtToken, business.getBusinessId());
    }

    /**
     * Cancel Recipient Request using API
     * Endpoint: /cancelRequest
     * Method: POST
     * Parameters: CancelRequest() // Model should be NotNull
     **/
    @PostMapping(path = "/cancelRequest")
    public RetrofitResponse<TinResponse> cancelRequest(
            HttpServletRequest httpServletRequest,
            @NotNull @RequestBody CancelRequest cancelRequest
    ) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return CancelRequestService.cancelRequest(jwtToken, cancelRequest.getSubmissionId(), cancelRequest.getRecordIds());
    }

    /**
     * Know about the status of Recipients using API
     * Endpoint: /StatusRequest
     * Method: POST
     * Parameters: CancelRequest() // Model should be NotNull
     **/
    @PostMapping(path = "/status")
    public RetrofitResponse<StatusResponse> status(
            HttpServletRequest httpServletRequest,
            @NotNull @RequestBody StatusRequest statusRequest
    ) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return StatusService.status(jwtToken, statusRequest.getRecipientTINType(), statusRequest.getRecipientTIN());
    }

}
