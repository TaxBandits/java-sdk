package com.formW9.sdk.retrofit.services;

import com.formW9.sdk.model.RequestByEmailRequest;
import com.formW9.sdk.model.RequestByEmailResponse;
import com.formW9.sdk.retrofit.ApiService;
import com.formW9.sdk.retrofit.ApiUtils;
import com.formW9.sdk.retrofit.RetrofitResponse;
import com.formW9.sdk.retrofit.RetrofitService;
import retrofit2.Response;

import java.io.IOException;

public class RequestByEmailService {

    public static RetrofitResponse<RequestByEmailResponse> requestByEmail(String jwtToken, RequestByEmailRequest request) {

        try {

            // Synchronous API call
            Response<RequestByEmailResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .requestByEmail(request)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                RequestByEmailResponse failureData = ApiUtils.getFailureData(response, RequestByEmailResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
