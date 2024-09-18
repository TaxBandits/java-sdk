package com.boir.sdk.retrofit.services.business;

import com.boir.sdk.model.business.CreateBusinessRequest;
import com.boir.sdk.model.business.CreateBusinessResponse;
import com.boir.sdk.retrofit.ApiService;
import com.boir.sdk.retrofit.ApiUtils;
import com.boir.sdk.retrofit.RetrofitResponse;
import com.boir.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class CreateBusinessService {

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
