package com.form1099MISC.sdk.retrofit;

import com.form1099MISC.sdk.model.*;
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
     * Validate Form1099MISC by SubmissionId API
     * Endpoint: /Form1099MISC/ValidateForm
     * Method: POST
     * Parameters: CreateForm1099MiscRequest()  // Model should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099MISC_VALIDATE_FORM)
    Call<CreateForm1099MiscResponse> validateForm(@Body CreateForm1099MiscRequest request);

    /**
     * Create Form1099MISC by API
     * Endpoint: /Form1099MISC/Create
     * Method: POST
     * Parameters: CreateForm1099MiscRequest()  // Model should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099MISC_CREATE)
    Call<CreateForm1099MiscResponse> form1099MiscCreate(@Body CreateForm1099MiscRequest request);

    /**
     * Update Form1099MISC by SubmissionId API
     * Endpoint: /Form1099MISC/Update
     * Method: POST
     * Parameters: CreateForm1099MiscRequest()  // Model should be NotNull
     **/
    @PUT(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099MISC_UPDATE)
    Call<CreateForm1099MiscResponse> form1099MiscUpdate(@Body CreateForm1099MiscRequest request);

    /**
     * List Form1099MISC from API
     * Endpoint: /Form1099MISC/List
     * Method: GET
     * Parameters: BusinessId, Page, PageSize  // Parameters should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099MISC_LIST)
    Call<Form1099MiscListResponse> form1099MiscList(@Query("BusinessId") String businessId, @Query("Page") Long page, @Query("PageSize") Long pageSize);

    /**
     * Get Form1099MISC Status by SubmissionId from API
     * Endpoint: /Form1099MISC/Status
     * Method: GET
     * Parameters: SubmissionId  // Parameters should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099MISC_STATUS)
    Call<StatusForm1099MiscResponse> form1099MiscStatus(@Query("SubmissionId") String submissionId);

    /**
     * Delete the Form1099MISC by API
     * Endpoint: /Form1099MISC/Delete
     * Method: POST
     * Parameters: SubmissionId, SubmissionId  // Module should be NotNull
     **/
    @DELETE(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099MISC_DELETE)
    Call<DeleteResponse> delete(@Query("SubmissionId") String submissionId, @Query("RecordIds") String[] recordIds);

    /**
     * Transmit the Form1099MISC by API
     * Endpoint: /Form1099MISC/Transmit
     * Method: POST
     * Parameters: TransmitRequest  // Module should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099MISC_TRANSMIT)
    Call<TransmitResponse> transmit(@Body TransmitRequest request);

    /**
     * RequestDraftPdfUrl of the Form1099MISC from API
     * Endpoint: /Form1099MISC/RequestDraftPdfUrl
     * Method: POST
     * Parameters: RequestDraftPdfUrlRequest  // Module should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099MISC_REQUEST_DRAFT_PDF_URL)
    Call<RequestDraftPdfUrlResponse> requestDraftPdfUrl(@Body RequestDraftPdfUrlRequest request);

    /**
     * RequestPdfURLs of the Form1099MISC from API
     * Endpoint: /Form1099MISC/RequestPdfURLs
     * Method: POST
     * Parameters: RequestPdfURLsRequest  // Module should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099MISC_REQUEST_PDF_URLS)
    Call<RequestPdfURLsResponse> requestPdfURLs(@Body RequestPdfURLsRequest request);

    /**
     * Get Form1099MISC by SubmissionId from API
     * Endpoint: /Form1099MISC/Get
     * Method: GET
     * Parameters: SubmissionId  // Parameters should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM1099MISC_GET)
    Call<GetForm1099MiscResponse> form1099MiscGet(@Query("SubmissionId") String submissionId);

}
