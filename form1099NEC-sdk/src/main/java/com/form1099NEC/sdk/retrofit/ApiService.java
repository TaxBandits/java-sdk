package com.form1099NEC.sdk.retrofit;

import com.form1099NEC.sdk.model.*;
import retrofit2.Call;
import retrofit2.http.*;

public interface ApiService {

    /**
     * Create a business using the API
     * Endpoint: /Business/Create
     * Method: POST
     * Parameters: CreateBusinessRequest() // Model should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.BUSINESS_CREATE)
    Call<CreateBusinessResponse> createBusiness(@Body CreateBusinessRequest request);

    /**
     * List Business from API
     * Endpoint: /Business/List
     * Method: GET
     * Parameters: Page, PageSize  // Model should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.BUSINESS_LIST)
    Call<BusinessListResponse> businessList(@Query("Page") Long page, @Query("PageSize") Long pageSize);

    /**
     * Validate Form1099NEC by SubmissionId API
     * Endpoint: /Form1099NEC/ValidateForm
     * Method: POST
     * Parameters: CreateForm1099NecRequest()  // Model should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099NEC_VALIDATE_FORM)
    Call<CreateForm1099NecResponse> validateForm(@Body CreateForm1099NecRequest request);

    /**
     * Create Form1099NEC by API
     * Endpoint: /Form1099NEC/Create
     * Method: POST
     * Parameters: CreateForm1099NecRequest()  // Model should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099NEC_CREATE)
    Call<CreateForm1099NecResponse> form1099NecCreate(@Body CreateForm1099NecRequest request);

    /**
     * Update Form1099NEC by SubmissionId API
     * Endpoint: /Form1099NEC/Update
     * Method: POST
     * Parameters: CreateForm1099NecRequest()  // Model should be NotNull
     **/
    @PUT(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099NEC_UPDATE)
    Call<CreateForm1099NecResponse> form1099NecUpdate(@Body CreateForm1099NecRequest request);

    /**
     * List Form1099NEC from API
     * Endpoint: /Form1099NEC/List
     * Method: GET
     * Parameters: BusinessId, Page, PageSize  // Parameters should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099NEC_LIST)
    Call<FormNec1099ListResponse> form1099NecList(@Query("BusinessId") String businessId, @Query("Page") Long page, @Query("PageSize") Long pageSize);

    /**
     * Get Form1099NEC Status by SubmissionId from API
     * Endpoint: /Form1099NEC/Status
     * Method: GET
     * Parameters: SubmissionId  // Parameters should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099NEC_STATUS)
    Call<StatusForm1099NecResponse> form1099NecStatus(@Query("SubmissionId") String submissionId);

    /**
     * Delete the Form1099NEC by API
     * Endpoint: /Form1099NEC/Delete
     * Method: POST
     * Parameters: SubmissionId, SubmissionId  // Module should be NotNull
     **/
    @DELETE(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099NEC_DELETE)
    Call<DeleteResponse> delete(@Query("SubmissionId") String submissionId, @Query("RecordIds") String[] recordIds);

    /**
     * Transmit the Form1099NEC by API
     * Endpoint: /Form1099NEC/Transmit
     * Method: POST
     * Parameters: TransmitRequest  // Module should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099NEC_TRANSMIT)
    Call<TransmitResponse> transmit(@Body TransmitRequest request);

    /**
     * RequestDraftPdfUrl of the Form1099NEC from API
     * Endpoint: /Form1099NEC/RequestDraftPdfUrl
     * Method: POST
     * Parameters: RequestDraftPdfUrlRequest  // Module should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099NEC_REQUEST_DRAFT_PDF_URL)
    Call<RequestDraftPdfUrlResponse> requestDraftPdfUrl(@Body RequestDraftPdfUrlRequest request);

    /**
     * RequestPdfURLs of the Form1099NEC from API
     * Endpoint: /Form1099NEC/RequestPdfURLs
     * Method: POST
     * Parameters: RequestPdfURLsRequest  // Module should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099NEC_REQUEST_PDF_URLS)
    Call<RequestPdfURLsResponse> requestPdfURLs(@Body RequestPdfURLsRequest request);

    /**
     * Get Form1099NEC by SubmissionId from API
     * Endpoint: /Form1099NEC/Get
     * Method: GET
     * Parameters: SubmissionId  // Parameters should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099NEC_GET)
    Call<GetForm1099NecResponse> form1099NecGet(@Query("SubmissionId") String submissionId);

}
