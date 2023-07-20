package com.business.sdk.retrofit;

import com.business.sdk.model.BusinessListResponse;
import com.business.sdk.model.CreateBusinessRequest;
import com.business.sdk.model.CreateBusinessResponse;
import com.business.sdk.model.GetBusinessResponse;
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
     * Update a business using the API
     * Endpoint: /Business/Update
     * Method: POST
     * Parameters: CreateBusinessRequest() // Model should be NotNull
     **/
    @PUT(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.BUSINESS_UPDATE)
    Call<CreateBusinessResponse> updateBusiness(@Body CreateBusinessRequest request);

    /**
     * Get Business details by BusinessId from API
     * Endpoint: /Business/Get
     * Method: GET
     * Parameters: BusinessId  // Model should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.BUSINESS_GET)
    Call<GetBusinessResponse> getBusiness(@Query("BusinessId") String businessId);

}
