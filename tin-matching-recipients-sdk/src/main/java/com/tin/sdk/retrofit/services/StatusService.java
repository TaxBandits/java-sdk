package com.tin.sdk.retrofit.services;

import com.tin.sdk.model.StatusResponse;
import com.tin.sdk.retrofit.ApiService;
import com.tin.sdk.retrofit.ApiUtils;
import com.tin.sdk.retrofit.RetrofitResponse;
import com.tin.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class StatusService {

    public static RetrofitResponse<StatusResponse> status(String jwtToken, String recipientTINType, String recipientTIN) {

        try {

            // Synchronous API call
            Response<StatusResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .status(recipientTINType, recipientTIN)
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
