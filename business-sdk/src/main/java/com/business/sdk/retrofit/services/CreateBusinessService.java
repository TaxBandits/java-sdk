package com.business.sdk.retrofit.services;

import com.business.sdk.model.CreateBusinessRequest;
import com.business.sdk.model.CreateBusinessResponse;
import com.business.sdk.retrofit.ApiService;
import com.business.sdk.retrofit.ApiUtils;
import com.business.sdk.retrofit.RetrofitResponse;
import com.business.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class CreateBusinessService {

    /**
     * Get Business list from API
     * parameters: jwtToken, CreateBusinessRequest()  // Parameters should be NotNull
     **/
    public static RetrofitResponse<CreateBusinessResponse> createBusiness(String jwtToken, CreateBusinessRequest request) {

        try {

            // Synchronous API call
            Response<CreateBusinessResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .createBusiness(request)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                CreateBusinessResponse failureData = ApiUtils.getFailureData(response, CreateBusinessResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}