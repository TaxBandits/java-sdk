package com.boir.sdk.controller.rest_controller;

import com.boir.sdk.controller.utils.PingUtils;
import com.boir.sdk.controller.utils.core.PingModel;
import com.boir.sdk.model.boir.create.request.CreateBoirRequest;
import com.boir.sdk.model.boir.create.response.CreateBoirResponse;
import com.boir.sdk.model.boir.get.request.GetBOIRRequest;
import com.boir.sdk.model.boir.get.response.GetBOIRResponse;
import com.boir.sdk.retrofit.RetrofitResponse;
import com.boir.sdk.retrofit.services.boir.CreateBOIRService;
import com.boir.sdk.retrofit.services.boir.GetBOIRService;
import jakarta.servlet.http.HttpServletRequest;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BOIRRestController {

    /**
     * Create a BOIR using the API
     * Endpoint: /createBOIR
     * Method: POST
     * Parameters: CreateBoirRequest() // Model should be NotNull
     **/
    @PostMapping("/createBOIR")
    public RetrofitResponse<CreateBoirResponse> createBOIR(HttpServletRequest httpServletRequest, @NotNull @RequestBody CreateBoirRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        //  Check the connectivity and response
//        PingModel pingModel = PingUtils.checkServerAndJWT(jwtToken);
        return CreateBOIRService.createBOIR(jwtToken, request);
        /*if (pingModel.getIsVerified())
            return CreateBOIRService.createBOIR(jwtToken, request);
        else {
            CreateBoirResponse createBoirResponse = new CreateBoirResponse();
            createBoirResponse.setErrors(pingModel.getErrors());
            return new RetrofitResponse<>(pingModel.getStatusCode(), pingModel.getStatusMessage(), createBoirResponse);
        }*/
    }

    /**
     * Create a BOIR using the API
     * Endpoint: /viewBOIR
     * Method: POST
     * Parameters: submissionId, reportNumber // Params should be NotNull
     **/
    @PostMapping("/viewBOIR")
    public RetrofitResponse<GetBOIRResponse> viewBOIR(HttpServletRequest httpServletRequest, @NotNull @RequestBody GetBOIRRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        //  Check the connectivity and response
        /*PingModel pingModel = PingUtils.checkServerAndJWT(jwtToken);
        if (pingModel.getIsVerified())
            return GetBOIRService.getBOIR(jwtToken, request.getSubmissionId(), request.getReportNumber());
        else {
            GetBOIRResponse getBOIRResponse = new GetBOIRResponse();
            getBOIRResponse.setErrors(pingModel.getErrors());
            return new RetrofitResponse<>(pingModel.getStatusCode(), pingModel.getStatusMessage(), getBOIRResponse);
        }*/
        return GetBOIRService.getBOIR(jwtToken, request.getSubmissionId(), request.getReportNumber());
    }

}
