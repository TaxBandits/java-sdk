package com.form1099MISC.sdk.controller.rest_controller;

import com.form1099MISC.sdk.controller.model.*;
import com.form1099MISC.sdk.model.*;
import com.form1099MISC.sdk.retrofit.RetrofitResponse;
import com.form1099MISC.sdk.retrofit.services.*;
import com.form1099MISC.sdk.utils.AmazonS3Decryption;
import com.form1099MISC.sdk.utils.StringUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class Form1099MiscRestController {

    /**
     * Create Form1099Misc by API
     * Endpoint: /form1099MiscCreate
     * Method: POST
     * Parameters: CreateForm1099MiscRequest()   //  Should be Not null
     **/
    @PostMapping("/form1099MiscCreate")
    public RetrofitResponse<CreateForm1099MiscResponse> form1099MiscCreate(HttpServletRequest httpServletRequest, @NotNull @RequestBody CreateForm1099MiscRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return Form1099MiscCreateOrUpdateService.form1099MiscCreateOrUpdate(jwtToken, false, request);
    }

    /**
     * Update Form1099Misc by API
     * Endpoint: /form1099MiscUpdate
     * Method: POST
     * Parameters: CreateForm1099MiscRequest()   //  Should be Not null
     **/
    @PostMapping("/form1099MiscUpdate")
    public RetrofitResponse<CreateForm1099MiscResponse> form1099MiscUpdate(HttpServletRequest httpServletRequest, @NotNull @RequestBody CreateForm1099MiscRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return Form1099MiscCreateOrUpdateService.form1099MiscCreateOrUpdate(jwtToken, true, request);
    }

    /**
     * Validate Form1099Misc by API
     * Endpoint: /validateForm
     * Method: POST
     * Parameters: CreateForm1099MiscRequest()   //  Should be Not null
     **/
    @PostMapping("/validateForm")
    public RetrofitResponse<CreateForm1099MiscResponse> validateForm(HttpServletRequest httpServletRequest, @NotNull @RequestBody CreateForm1099MiscRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return ValidateFormService.validateForm(jwtToken, request);
    }

    /**
     * Get Form1099Misc list from API
     * Endpoint: /form1099MiscList
     * Method: POST
     * Parameters: BusinessIdRequest()   //  Should be Not null
     **/
    @PostMapping("/form1099MiscList")
    public RetrofitResponse<Form1099MiscListResponse> form1099MiscList(HttpServletRequest httpServletRequest, @NotNull @RequestBody BusinessIdRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return Form1099MiscListService.form1099MiscList(jwtToken, request.getBusinessId());
    }

    /**
     * Get Form1099Misc by from API
     * Endpoint: /form1099MiscGet
     * Method: POST
     * Parameters: SubmissionIdRequest()   //  Should be Not null
     **/
    @PostMapping("/form1099MiscGet")
    public RetrofitResponse<GetForm1099MiscResponse> form1099MiscGet(HttpServletRequest httpServletRequest, @NotNull @RequestBody SubmissionIdRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return Form1099MiscGetService.form1099MiscGet(jwtToken, request.getSubmissionId());
    }

    /**
     * Get Form1099Misc Status by from API
     * Endpoint: /form1099MiscStatus
     * Method: POST
     * Parameters: SubmissionIdRequest()   //  Should be Not null
     **/
    @PostMapping("/form1099MiscStatus")
    public RetrofitResponse<StatusForm1099MiscResponse> form1099MiscStatus(HttpServletRequest httpServletRequest, @NotNull @RequestBody SubmissionIdRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return Form1099MiscStatusService.form1099MiscStatus(jwtToken, request.getSubmissionId());
    }

    /**
     * RequestDraftPdfUrl of the Form1099Misc by API
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
     * RequestPdfURLs of the Form1099Misc by API
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
     * Form1099Misc Transmit by API
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
     * Delete Form1099Misc by API
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
