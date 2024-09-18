package com.formW9.sdk.retrofit.services;

import com.formW9.sdk.model.RequestByUrlRequest;
import com.formW9.sdk.model.RequestByUrlResponse;
import com.formW9.sdk.retrofit.ApiService;
import com.formW9.sdk.retrofit.ApiUtils;
import com.formW9.sdk.retrofit.RetrofitResponse;
import com.formW9.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class RequestByUrlService {

    public static RetrofitResponse<RequestByUrlResponse> requestByUrl(String jwtToken, RequestByUrlRequest request) {

        try {

            // Synchronous API call
            Response<RequestByUrlResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .requestByUrl(request)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                RequestByUrlResponse failureData = ApiUtils.getFailureData(response, RequestByUrlResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
