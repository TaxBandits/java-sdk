package com.business.sdk.retrofit.services;

import com.business.sdk.controller.model.GetBusinessRequest;
import com.business.sdk.model.GetBusinessResponse;
import com.business.sdk.retrofit.ApiService;
import com.business.sdk.retrofit.ApiUtils;
import com.business.sdk.retrofit.RetrofitResponse;
import com.business.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class GetBusinessService {

    /**
     * Get Business list from API
     * parameters: jwtToken, GetBusinessRequest()  // Parameters should be NotNull
     **/
    public static RetrofitResponse<GetBusinessResponse> getBusiness(String jwtToken, GetBusinessRequest request) {

        try {
            // Synchronous API call
            Response<GetBusinessResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .getBusiness(request.getBusinessId())
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                GetBusinessResponse failureData = ApiUtils.getFailureData(response, GetBusinessResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}