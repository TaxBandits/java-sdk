package com.form1099K.sdk.controller.rest_controller;

import com.form1099K.sdk.controller.model.*;
import com.form1099K.sdk.model.*;
import com.form1099K.sdk.retrofit.RetrofitResponse;
import com.form1099K.sdk.retrofit.services.*;
import com.form1099K.sdk.utils.AmazonS3Decryption;
import com.form1099K.sdk.utils.StringUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class Form1099KRestController {

    /**
     * Create Form1099K by API
     * Endpoint: /form1099KCreate
     * Method: POST
     * Parameters: CreateForm1099KRequest()   //  Should be Not null
     **/
    @PostMapping("/form1099KCreate")
    public RetrofitResponse<CreateForm1099KResponse> form1099KCreate(HttpServletRequest httpServletRequest, @NotNull @RequestBody CreateForm1099KRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return Form1099KCreateOrUpdateService.form1099KCreateOrUpdate(jwtToken, false, request);
    }

    /**
     * Update Form1099K by API
     * Endpoint: /form1099KUpdate
     * Method: POST
     * Parameters: CreateForm1099KRequest()   //  Should be Not null
     **/
    @PostMapping("/form1099KUpdate")
    public RetrofitResponse<CreateForm1099KResponse> form1099KUpdate(HttpServletRequest httpServletRequest, @NotNull @RequestBody CreateForm1099KRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return Form1099KCreateOrUpdateService.form1099KCreateOrUpdate(jwtToken, true, request);
    }

    /**
     * Validate Form1099K by API
     * Endpoint: /validateForm
     * Method: POST
     * Parameters: CreateForm1099KRequest()   //  Should be Not null
     **/
    @PostMapping("/validateForm")
    public RetrofitResponse<CreateForm1099KResponse> validateForm(HttpServletRequest httpServletRequest, @NotNull @RequestBody CreateForm1099KRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return ValidateFormService.validateForm(jwtToken, request);
    }

    /**
     * Get Form1099K list from API
     * Endpoint: /form1099KList
     * Method: POST
     * Parameters: BusinessIdRequest()   //  Should be Not null
     **/
    @PostMapping("/form1099KList")
    public RetrofitResponse<Form1099KListResponse> form1099KList(HttpServletRequest httpServletRequest, @NotNull @RequestBody BusinessIdRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return Form1099KListService.form1099KList(jwtToken, request.getBusinessId());
    }

    /**
     * Get Form1099K by from API
     * Endpoint: /form1099KGet
     * Method: POST
     * Parameters: SubmissionIdRequest()   //  Should be Not null
     **/
    @PostMapping("/form1099KGet")
    public RetrofitResponse<GetForm1099KResponse> form1099KGet(HttpServletRequest httpServletRequest, @NotNull @RequestBody SubmissionIdRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return Form1099KGetService.form1099KGet(jwtToken, request.getSubmissionId());
    }

    /**
     * Get Form1099K Status by from API
     * Endpoint: /form1099KStatus
     * Method: POST
     * Parameters: SubmissionIdRequest()   //  Should be Not null
     **/
    @PostMapping("/form1099KStatus")
    public RetrofitResponse<StatusForm1099KResponse> form1099KStatus(HttpServletRequest httpServletRequest, @NotNull @RequestBody SubmissionIdRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return Form1099KStatusService.form1099KStatus(jwtToken, request.getSubmissionId());
    }

    /**
     * RequestDraftPdfUrl of the Form1099K by API
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
     * RequestPdfURLs of the Form1099K by API
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
     * Form1099K Transmit by API
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
     * Delete Form1099K by API
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
