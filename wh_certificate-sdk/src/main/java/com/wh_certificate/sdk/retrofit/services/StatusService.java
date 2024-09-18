package com.wh_certificate.sdk.retrofit.services;

import com.wh_certificate.sdk.model.StatusResponse;
import com.wh_certificate.sdk.retrofit.ApiService;
import com.wh_certificate.sdk.retrofit.ApiUtils;
import com.wh_certificate.sdk.retrofit.RetrofitResponse;
import com.wh_certificate.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class StatusService {

    public static RetrofitResponse<StatusResponse> getTinList(String jwtToken, String businessId) {

        try {

            // Synchronous API call
            Response<StatusResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .status(businessId)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                StatusResponse failureData = ApiUtils.getFailureData(response, StatusResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
