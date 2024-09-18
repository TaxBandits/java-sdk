package com.formw2.sdk.controller.rest_controller;

import com.formw2.sdk.controller.model.BusinessIdRequest;
import com.formw2.sdk.controller.model.SubmissionIdRequest;
import com.formw2.sdk.model.CreateFormW2Request;
import com.formw2.sdk.model.CreateFormW2Response;
import com.formw2.sdk.model.FormW2ListResponse;
import com.formw2.sdk.model.GetFormW2Response;
import com.formw2.sdk.retrofit.RetrofitResponse;
import com.formw2.sdk.retrofit.services.FormW2GetService;
import com.formw2.sdk.retrofit.services.FormW2ListService;
import com.formw2.sdk.retrofit.services.ValidateFormService;
import jakarta.servlet.http.HttpServletRequest;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FormW2RestController {

    /**
     * Create Form1099Nec by API
     * Endpoint: /form1099NecCreate
     * Method: POST
     * Parameters: CreateForm1099NecRequest()   //  Should be Not null
     **/
    /*@PostMapping("/form1099NecCreate")
    public RetrofitResponse<CreateFormW2Response> form1099NecCreate(HttpServletRequest httpServletRequest, @NotNull @RequestBody CreateFormW2Request request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return Form1099NecCreateOrUpdateService.form1099NecCreateOrUpdate(jwtToken, false, request);
    }*/


    /**
     * Update Form1099Nec by API
     * Endpoint: /form1099NecUpdate
     * Method: POST
     * Parameters: CreateForm1099NecRequest()   //  Should be Not null
     **/

    /*@PostMapping("/form1099NecUpdate")
    public RetrofitResponse<CreateFormW2Response> form1099NecUpdate(HttpServletRequest httpServletRequest, @NotNull @RequestBody CreateFormW2Request request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return Form1099NecCreateOrUpdateService.form1099NecCreateOrUpdate(jwtToken, true, request);
    }*/

    /**
     * Validate Form1099Nec by API
     * Endpoint: /validateForm
     * Method: POST
     * Parameters: CreateForm1099NecRequest()   //  Should be Not null
     **/
    @PostMapping("/validateForm")
    public RetrofitResponse<CreateFormW2Response> validateForm(HttpServletRequest httpServletRequest, @NotNull @RequestBody CreateFormW2Request request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return ValidateFormService.validateForm(jwtToken, request);
    }

    /**
     * Get FormW2 list from API
     * Endpoint: /formW2List
     * Method: POST
     * Parameters: BusinessIdRequest()   //  Should be Not null
     **/

    @PostMapping("/formW2List")
    public RetrofitResponse<FormW2ListResponse> form1099NecList(HttpServletRequest httpServletRequest, @NotNull @RequestBody BusinessIdRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return FormW2ListService.form1099NecList(jwtToken, request.getBusinessId());
    }

    /**
     * Get FormW2 by from API
     * Endpoint: /formW2Get
     * Method: POST
     * Parameters: SubmissionIdRequest()   //  Should be Not null
     **/

    @PostMapping("/formW2Get")
    public RetrofitResponse<GetFormW2Response> form1099NecGet(HttpServletRequest httpServletRequest, @NotNull @RequestBody SubmissionIdRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return FormW2GetService.form1099NecGet(jwtToken, request.getSubmissionId());
    }

    /**
     * Get Form1099Nec Status by from API
     * Endpoint: /form1099NecStatus
     * Method: POST
     * Parameters: SubmissionIdRequest()   //  Should be Not null
     **//*

    @PostMapping("/form1099NecStatus")
    public RetrofitResponse<StatusForm1099NecResponse> form1099NecStatus(HttpServletRequest httpServletRequest, @NotNull @RequestBody SubmissionIdRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return Form1099NecStatusService.form1099NecStatus(jwtToken, request.getSubmissionId());
    }

    */
/**
 * RequestDraftPdfUrl of the Form1099Nec by API
 * Endpoint: /requestDraftPdfUrl
 * Method: POST
 * Parameters: RequestDraftPdfUrlRequest()   //  Should be Not null
 **//*

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

    */
/**
 * RequestPdfURLs of the Form1099Nec by API
 * Endpoint: /requestPdfURLs
 * Method: POST
 * Parameters: RequestPdfURLsRequest()   //  Should be Not null
 **//*

    @PostMapping("/requestPdfURLs")
    public RetrofitResponse<RequestPdfURLsResponse> requestPdfURLs(HttpServletRequest httpServletRequest, @NotNull @RequestBody RequestPdfURLsRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return RequestPdfUrlsService.requestPdfUrls(jwtToken, request);
    }

    */
/**
 * Get AmazonS3 Pdf by Url from Local
 * Endpoint: /getAmazonS3FileByUrl
 * Method: POST
 * Parameter: UrlRequest()   //  Should be Not null
 **//*

    @PostMapping("/getAmazonS3FileByUrl")
    public UrlResponse getAmazonS3FileByUrl(@NotNull @RequestBody UrlRequest request) {
        UrlResponse urlResponse = new UrlResponse();
        byte[] blobData = AmazonS3Decryption.getAmazonS3PdfByFileName(request.getUrl());
        urlResponse.setBlobData(blobData);
        return urlResponse;
    }

    */
/**
 * Form1099Nec Transmit by API
 * Endpoint: /transmit
 * Method: POST
 * Parameters: TransmitRequest()   //  Should be Not null
 **//*

    @PostMapping("/transmit")
    public RetrofitResponse<TransmitResponse> transmit(HttpServletRequest httpServletRequest, @NotNull @RequestBody TransmitRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return TransmitService.transmit(jwtToken, request);
    }

    */
/**
 * Delete Form1099Nec by API
 * Endpoint: /delete
 * Method: POST
 * Parameters: TransmitRequest()   //  Should be Not null
 **//*

    @PostMapping("/delete")
    public RetrofitResponse<DeleteResponse> delete(HttpServletRequest httpServletRequest, @NotNull @RequestBody DeleteRequest request) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return DeleteService.delete(jwtToken, request.getSubmissionId(), request.getRecordIds());
    }
*/

}
