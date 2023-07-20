package com.tin.sdk.retrofit.services;

import com.tin.sdk.model.BusinessListResponse;
import com.tin.sdk.retrofit.ApiService;
import com.tin.sdk.retrofit.ApiUtils;
import com.tin.sdk.retrofit.RetrofitResponse;
import com.tin.sdk.retrofit.RetrofitService;
import retrofit2.Response;

import java.io.IOException;

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

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
