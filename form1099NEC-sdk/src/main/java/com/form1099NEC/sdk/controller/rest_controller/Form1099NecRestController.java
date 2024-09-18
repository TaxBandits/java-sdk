package com.form1099NEC.sdk.controller.rest_controller;

import com.form1099NEC.sdk.controller.model.*;
import com.form1099NEC.sdk.model.*;
import com.form1099NEC.sdk.retrofit.RetrofitResponse;
import com.form1099NEC.sdk.retrofit.services.*;
import com.form1099NEC.sdk.utils.AmazonS3Decryption;
import com.form1099NEC.sdk.utils.StringUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class Form1099NecRestController {

    /**
     * Create Form1099Nec by API
     * Endpoint: /form1099NecCreate
     * Method: POST
     * Parameters: CreateForm1099NecRequest()   //  Should be Not null
     **/
    @PostMapping("/form1099NecCreate")
    public RetrofitResponse<CreateForm1099NecResponse> form1099NecCreate(HttpServletRequest httpServletRequest, @NotNull @RequestBody CreateForm1099NecRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return Form1099NecCreateOrUpdateService.form1099NecCreateOrUpdate(jwtToken, false, request);
    }

    /**
     * Update Form1099Nec by API
     * Endpoint: /form1099NecUpdate
     * Method: POST
     * Parameters: CreateForm1099NecRequest()   //  Should be Not null
     **/
    @PostMapping("/form1099NecUpdate")
    public RetrofitResponse<CreateForm1099NecResponse> form1099NecUpdate(HttpServletRequest httpServletRequest, @NotNull @RequestBody CreateForm1099NecRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return Form1099NecCreateOrUpdateService.form1099NecCreateOrUpdate(jwtToken, true, request);
    }

    /**
     * Validate Form1099Nec by API
     * Endpoint: /validateForm
     * Method: POST
     * Parameters: CreateForm1099NecRequest()   //  Should be Not null
     **/
    @PostMapping("/validateForm")
    public RetrofitResponse<CreateForm1099NecResponse> validateForm(HttpServletRequest httpServletRequest, @NotNull @RequestBody CreateForm1099NecRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return ValidateFormService.validateForm(jwtToken, request);
    }

    /**
     * Get Form1099Nec list from API
     * Endpoint: /form1099NecList
     * Method: POST
     * Parameters: BusinessIdRequest()   //  Should be Not null
     **/
    @PostMapping("/form1099NecList")
    public RetrofitResponse<FormNec1099ListResponse> form1099NecList(HttpServletRequest httpServletRequest, @NotNull @RequestBody BusinessIdRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return Form1099NecListService.form1099NecList(jwtToken, request.getBusinessId());
    }

    /**
     * Get Form1099Nec by from API
     * Endpoint: /form1099NecGet
     * Method: POST
     * Parameters: SubmissionIdRequest()   //  Should be Not null
     **/
    @PostMapping("/form1099NecGet")
    public RetrofitResponse<GetForm1099NecResponse> form1099NecGet(HttpServletRequest httpServletRequest, @NotNull @RequestBody SubmissionIdRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return Form1099NecGetService.form1099NecGet(jwtToken, request.getSubmissionId());
    }

    /**
     * Get Form1099Nec Status by from API
     * Endpoint: /form1099NecStatus
     * Method: POST
     * Parameters: SubmissionIdRequest()   //  Should be Not null
     **/
    @PostMapping("/form1099NecStatus")
    public RetrofitResponse<StatusForm1099NecResponse> form1099NecStatus(HttpServletRequest httpServletRequest, @NotNull @RequestBody SubmissionIdRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return Form1099NecStatusService.form1099NecStatus(jwtToken, request.getSubmissionId());
    }

    /**
     * RequestDraftPdfUrl of the Form1099Nec by API
     * Endpoint: /requestDraftPdfUrl
     * Method: POST
     * Parameters: RequestDraftPdfUrlRequest()   //  Should be Not null
     **/
    @PostMapping("/requestDraftPdfUrl")
    public RetrofitResponse<RequestDraftPdfUrlResponse> requestDraftPdfUrl(HttpServletRequest httpServletRequest, HttpServletResponse response, @NotNull @RequestBody RequestDraftPdfUrlRequest request) throws IOException {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        RetrofitResponse<RequestDraftPdfUrlResponse> retrofitResponse = RequestDraftPdfUrlService.requestDraftPdfUrl(jwtToken, request);
        RequestDraftPdfUrlResponse data = retrofitResponse.getData();
        if (data != null) {
            RequestDraftPdfUrlResponse requestDraftPdfUrlResponse = retrofitResponse.getData();
            String draftPdfUrl = requestDraftPdfUrlResponse.getDraftPdfUrl();
            if (StringUtils.isValidString(draftPdfUrl)) {
                byte[] blobData = AmazonS3Decryption.getAmazonS3PdfByFileName(draftPdfUrl);
                requestDraftPdfUrlResponse.setBlobData(blobData);
                retrofitResponse.setData(requestDraftPdfUrlResponse);
            }
        }
        return retrofitResponse;
    }

    /**
     * RequestPdfURLs of the Form1099Nec by API
     * Endpoint: /requestPdfURLs
     * Method: POST
     * Parameters: RequestPdfURLsRequest()   //  Should be Not null
     **/
    @PostMapping("/requestPdfURLs")
    public RetrofitResponse<RequestPdfURLsResponse> requestPdfURLs(HttpServletRequest httpServletRequest, @NotNull @RequestBody RequestPdfURLsRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return RequestPdfUrlsService.requestPdfUrls(jwtToken, request);
    }

    /**
     * Get AmazonS3 Pdf by Url from Local
     * Endpoint: /getAmazonS3FileByUrl
     * Method: POST
     * Parameter: UrlRequest()   //  Should be Not null
     **/
    @PostMapping("/getAmazonS3FileByUrl")
    public UrlResponse getAmazonS3FileByUrl(@NotNull @RequestBody UrlRequest request) {
        UrlResponse urlResponse = new UrlResponse();
        byte[] blobData = AmazonS3Decryption.getAmazonS3PdfByFileName(request.getUrl());
        urlResponse.setBlobData(blobData);
        return urlResponse;
    }

    /**
     * Form1099Nec Transmit by API
     * Endpoint: /transmit
     * Method: POST
     * Parameters: TransmitRequest()   //  Should be Not null
     **/
    @PostMapping("/transmit")
    public RetrofitResponse<TransmitResponse> transmit(HttpServletRequest httpServletRequest, @NotNull @RequestBody TransmitRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return TransmitService.transmit(jwtToken, request);
    }

    /**
     * Delete Form1099Nec by API
     * Endpoint: /delete
     * Method: POST
     * Parameters: TransmitRequest()   //  Should be Not null
     **/
    @PostMapping("/delete")
    public RetrofitResponse<DeleteResponse> delete(HttpServletRequest httpServletRequest, @NotNull @RequestBody DeleteRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return DeleteService.delete(jwtToken, request.getSubmissionId(), request.getRecordIds());
    }

}
