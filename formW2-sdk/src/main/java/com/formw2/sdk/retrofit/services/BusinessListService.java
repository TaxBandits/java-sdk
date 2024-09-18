package com.formw2.sdk.retrofit.services;

import com.formw2.sdk.model.BusinessListResponse;
import com.formw2.sdk.retrofit.ApiService;
import com.formw2.sdk.retrofit.ApiUtils;
import com.formw2.sdk.retrofit.RetrofitResponse;
import com.formw2.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class BusinessListService {

    public static RetrofitResponse<BusinessListResponse> businessList(String jwtToken) {

        try {

            // Synchronous API call
            Response<BusinessListResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .businessList(1L, 10L)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                BusinessListResponse failureData = ApiUtils.getFailureData(response, BusinessListResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
