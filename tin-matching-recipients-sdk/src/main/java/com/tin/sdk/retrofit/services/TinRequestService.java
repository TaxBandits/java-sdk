package com.tin.sdk.retrofit.services;

import com.tin.sdk.model.TinRequest;
import com.tin.sdk.model.TinResponse;
import com.tin.sdk.retrofit.ApiService;
import com.tin.sdk.retrofit.ApiUtils;
import com.tin.sdk.retrofit.RetrofitResponse;
import com.tin.sdk.retrofit.RetrofitService;
import retrofit2.Response;

import java.io.IOException;

public class TinRequestService {

    public static RetrofitResponse<TinResponse> createTinRequest(String jwtToken, TinRequest request) {

        try {

            // Synchronous API call
            Response<TinResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .createTinRequest(request)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                TinResponse tinResponse = ApiUtils.getFailureData(response, TinResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), tinResponse);
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
