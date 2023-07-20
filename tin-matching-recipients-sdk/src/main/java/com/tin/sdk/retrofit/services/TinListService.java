package com.tin.sdk.retrofit.services;

import com.tin.sdk.model.TinListResponse;
import com.tin.sdk.retrofit.ApiService;
import com.tin.sdk.retrofit.ApiUtils;
import com.tin.sdk.retrofit.RetrofitResponse;
import com.tin.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class TinListService {

    public static RetrofitResponse<TinListResponse> getTinList(String jwtToken, String businessId) {

        try {

            // Synchronous API call
            Response<TinListResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .getTinList(businessId)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                TinListResponse failureData = ApiUtils.getFailureData(response, TinListResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
