package com.wh_certificate.sdk.retrofit.services;

import com.wh_certificate.sdk.model.RequestByUrlRequest;
import com.wh_certificate.sdk.model.RequestByUrlResponse;
import com.wh_certificate.sdk.retrofit.ApiService;
import com.wh_certificate.sdk.retrofit.ApiUtils;
import com.wh_certificate.sdk.retrofit.RetrofitResponse;
import com.wh_certificate.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class RequestByUrlService {

    public static RetrofitResponse<RequestByUrlResponse> status(String jwtToken, RequestByUrlRequest request) {

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
