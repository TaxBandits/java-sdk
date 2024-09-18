package com.form1099K.sdk.retrofit;

import com.form1099K.sdk.model.*;
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
     * Validate Form1099K by SubmissionId API
     * Endpoint: /Form1099K/ValidateForm
     * Method: POST
     * Parameters: CreateForm1099KRequest()  // Model should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099K_VALIDATE_FORM)
    Call<CreateForm1099KResponse> validateForm(@Body CreateForm1099KRequest request);

    /**
     * Create Form1099K by API
     * Endpoint: /Form1099K/Create
     * Method: POST
     * Parameters: CreateForm1099KRequest()  // Model should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099K_CREATE)
    Call<CreateForm1099KResponse> form1099KCreate(@Body CreateForm1099KRequest request);

    /**
     * Update Form1099K by SubmissionId API
     * Endpoint: /Form1099K/Update
     * Method: POST
     * Parameters: CreateForm1099KRequest()  // Model should be NotNull
     **/
    @PUT(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099K_UPDATE)
    Call<CreateForm1099KResponse> form1099KUpdate(@Body CreateForm1099KRequest request);

    /**
     * List Form1099K from API
     * Endpoint: /Form1099K/List
     * Method: GET
     * Parameters: BusinessId, Page, PageSize  // Parameters should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099K_LIST)
    Call<Form1099KListResponse> form1099KList(@Query("BusinessId") String businessId, @Query("Page") Long page, @Query("PageSize") Long pageSize);

    /**
     * Get Form1099K Status by SubmissionId from API
     * Endpoint: /Form1099K/Status
     * Method: GET
     * Parameters: SubmissionId  // Parameters should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099K_STATUS)
    Call<StatusForm1099KResponse> form1099KStatus(@Query("SubmissionId") String submissionId);

    /**
     * Delete the Form1099K by API
     * Endpoint: /Form1099K/Delete
     * Method: POST
     * Parameters: SubmissionId, SubmissionId  // Module should be NotNull
     **/
    @DELETE(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099K_DELETE)
    Call<DeleteResponse> delete(@Query("SubmissionId") String submissionId, @Query("RecordIds") String[] recordIds);

    /**
     * Transmit the Form1099K by API
     * Endpoint: /Form1099K/Transmit
     * Method: POST
     * Parameters: TransmitRequest  // Module should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099K_TRANSMIT)
    Call<TransmitResponse> transmit(@Body TransmitRequest request);

    /**
     * RequestDraftPdfUrl of the Form1099K from API
     * Endpoint: /Form1099K/RequestDraftPdfUrl
     * Method: POST
     * Parameters: RequestDraftPdfUrlRequest  // Module should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099K_REQUEST_DRAFT_PDF_URL)
    Call<RequestDraftPdfUrlResponse> requestDraftPdfUrl(@Body RequestDraftPdfUrlRequest request);

    /**
     * RequestPdfURLs of the Form1099K from API
     * Endpoint: /Form1099K/RequestPdfURLs
     * Method: POST
     * Parameters: RequestPdfURLsRequest  // Module should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099K_REQUEST_PDF_URLS)
    Call<RequestPdfURLsResponse> requestPdfURLs(@Body RequestPdfURLsRequest request);

    /**
     * Get Form1099K by SubmissionId from API
     * Endpoint: /Form1099K/Get
     * Method: GET
     * Parameters: SubmissionId  // Parameters should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099K_GET)
    Call<GetForm1099KResponse> form1099KGet(@Query("SubmissionId") String submissionId);

}
