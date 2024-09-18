package com.formw2.sdk.retrofit;

import com.formw2.sdk.model.*;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface ApiService {

    /**
     * Check whether the Authentication based client credentials by API
     * Endpoint: /tbsauth
     * Method: GET
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_OAUTH + ApiConfig.TBS_AUTH)
    Call<AccessTokenResponse> tbsAuth();

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
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM_W2_VALIDATE_FORM)
    Call<CreateFormW2Response> validateForm(@Body CreateFormW2Request request);

    /**
     * List Form1099NEC from API
     * Endpoint: /Form1099NEC/List
     * Method: GET
     * Parameters: BusinessId, Page, PageSize  // Parameters should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM_W2_LIST)
    Call<FormW2ListResponse> formW2List(@Query("BusinessId") String businessId, @Query("Page") Long page, @Query("PageSize") Long pageSize);


    /**
     * Get Form1099NEC by SubmissionId from API
     * Endpoint: /Form1099NEC/Get
     * Method: GET
     * Parameters: SubmissionId  // Parameters should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM_W2_GET)
    Call<GetFormW2Response> formW2Get(@Query("SubmissionId") String submissionId);

}
