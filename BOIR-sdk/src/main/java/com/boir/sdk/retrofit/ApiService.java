package com.boir.sdk.retrofit;

import com.boir.sdk.model.boir.get.response.GetBOIRResponse;
import com.boir.sdk.model.business.BusinessListResponse;
import com.boir.sdk.model.business.CreateBusinessRequest;
import com.boir.sdk.model.business.CreateBusinessResponse;
import com.boir.sdk.model.boir.create.request.CreateBoirRequest;
import com.boir.sdk.model.boir.create.response.CreateBoirResponse;
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
     * Parameters: Page, PageSize  // Params should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.BUSINESS_LIST)
    Call<BusinessListResponse> businessList(@Query("Page") Long page, @Query("PageSize") Long pageSize);

    /**
     * BOIR Create using the API
     * Endpoint: /BOIR/Create
     * Method: POST
     * Parameters: BoirCreateRequest()  // Model should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.BOIR_CREATE)
    Call<CreateBoirResponse> createBOIR(@Body CreateBoirRequest request);

    /**
     * BOIR Create using the API
     * Endpoint: /BOIR/Create
     * Method: POST
     * Parameters: BoirCreateRequest()  // Model should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.BOIR_CREATE)
    Call<Object> createBOIR1(@Body CreateBoirRequest request);

    /**
     * BOIR Get using the API
     * Endpoint: /BOIR/Get
     * Method: GET
     * Parameters: SubmissionId, ReportNumber  // Params should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.BOIR_GET)
    Call<GetBOIRResponse> getBOIR(@Query("SubmissionId") String submissionId, @Query("ReportNumber") String reportNumber);

}
