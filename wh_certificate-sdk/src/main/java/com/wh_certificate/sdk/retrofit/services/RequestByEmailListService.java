package com.wh_certificate.sdk.retrofit.services;

import com.wh_certificate.sdk.model.RequestByEmailRequest;
import com.wh_certificate.sdk.model.RequestByEmailResponse;
import com.wh_certificate.sdk.retrofit.ApiService;
import com.wh_certificate.sdk.retrofit.ApiUtils;
import com.wh_certificate.sdk.retrofit.RetrofitResponse;
import com.wh_certificate.sdk.retrofit.RetrofitService;
import retrofit2.Response;

import java.io.IOException;

public class RequestByEmailListService {

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
