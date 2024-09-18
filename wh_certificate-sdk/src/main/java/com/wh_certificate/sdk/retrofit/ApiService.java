package com.wh_certificate.sdk.retrofit;

import com.wh_certificate.sdk.model.*;
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
     * Parameters: Page, PageSize  // Model should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.BUSINESS_LIST)
    Call<BusinessListResponse> businessList(@Query("Page") Long page, @Query("PageSize") Long pageSize);

    /**
     * List Business from API
     * Endpoint: /Business/List
     * Method: GET
     * Parameters: Page, PageSize  // Model should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.WH_CERTIFICATE_GET)
    Call<GetResponse> get(@Query("BusinessId") String businessId);

    /**
     * List Business from API
     * Endpoint: /Business/List
     * Method: GET
     * Parameters: Page, PageSize  // Model should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.WH_CERTIFICATE_REQUEST_BY_EMAIL)
    Call<RequestByEmailResponse> requestByEmail(@Body RequestByEmailRequest request);

    /**
     * List Business from API
     * Endpoint: /Business/List
     * Method: GET
     * Parameters: Page, PageSize  // Model should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.WH_CERTIFICATE_REQUEST_BY_URL)
    Call<RequestByUrlResponse> requestByUrl(@Body RequestByUrlRequest request);

    /**
     * List Business from API
     * Endpoint: /Business/List
     * Method: GET
     * Parameters: Page, PageSize  // Model should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.WH_CERTIFICATE_STATUS)
    Call<StatusResponse> status(@Query("BusinessId") String businessId);

}
