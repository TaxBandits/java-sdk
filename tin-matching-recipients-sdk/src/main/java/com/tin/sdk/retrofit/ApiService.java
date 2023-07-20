package com.tin.sdk.retrofit;

import com.tin.sdk.model.*;
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
     * Create a TIN matching request using the API
     * Endpoint: /TINMatchingRecipients/Request
     * Method: POST
     * Parameters: TinRequest() // Model should be NotNull
     **/
    @POST(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.TIN_MATCHING_RECIPIENTS_REQUEST)
    Call<TinResponse> createTinRequest(@Body TinRequest request);

    /**
     * List business from API
     * Endpoint: /TINMatchingRecipients/List
     * Method: GET
     * Parameters: BusinessId // Model should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.TIN_MATCHING_RECIPIENTS_LIST)
    Call<TinListResponse> getTinList(@Query("BusinessId") String businessId);

    /**
     * Cancel TIN matching request using the API
     * Endpoint: /TINMatchingRecipients/CancelRequest
     * Method: PUT
     * Parameters: SubmissionId, RecordIds // Model should be NotNull
     **/
    @PUT(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.TIN_MATCHING_RECIPIENTS_CANCEL_REQUEST)
    Call<TinResponse> cancelRequest(@Query("SubmissionId") String submissionId, @Query("RecordIds") String[] recordIds);

    /**
     * Get status TIN matching recipient from API
     * Endpoint: /TINMatchingRecipients/Status
     * Method: POST
     * Parameters: RecipientTINType, RecipientTIN // Model should be NotNull
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.TIN_MATCHING_RECIPIENTS_STATUS)
    Call<StatusResponse> status(@Query("RecipientTINType") String recipientTINType, @Query("RecipientTIN") String recipientTIN);

}
