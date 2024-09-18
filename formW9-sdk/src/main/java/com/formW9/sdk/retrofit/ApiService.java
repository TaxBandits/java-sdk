package com.formW9.sdk.retrofit;

import com.formW9.sdk.controller.model.PayeeRefRequest;
import com.formW9.sdk.model.*;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;

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
     * Parameters: Page, PageSize  //   Parameters should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.BUSINESS_LIST)
    Call<BusinessListResponse> businessList(@Query("Page") Long page, @Query("PageSize") Long pageSize);

    /**
     * List FormW9 from API
     * Endpoint: /FormW9/List
     * Method: GET
     * Parameters: BusinessId, Page, PageSize  //   Parameters should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM_W9_LIST)
    Call<FormW9ListResponse> formW9List(@Query("BusinessId") String businessId, @Query("Page") long page, @Query("PageSize") long pageSize);

    /**
     * FormW9 request by Email from API
     * Endpoint: /FormW9/RequestByEmail
     * Method: GET
     * Parameters: RequestByEmailRequest  // Model should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM_W9_REQUEST_BY_EMAIL)
    Call<RequestByEmailResponse> requestByEmail(@Body RequestByEmailRequest request);

    /**
     * FormW9 request by URL from API
     * Endpoint: /FormW9/RequestByUrl
     * Method: GET
     * Parameters: RequestByUrlRequest  // Model should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM_W9_REQUEST_BY_URL)
    Call<RequestByUrlResponse> requestByUrl(@Body RequestByUrlRequest request);

    /**
     * FormW9 request by URL from API
     * Endpoint: /FormW9/Get
     * Method: GET
     * Parameters: RequestByUrlRequest  // Model should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.FORM_W9_GET)
    Call<FormW9GetResponse> getFormW9(@Query("PayeeRef") String payeeRef);

}
