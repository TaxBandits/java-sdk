package com.form1099NEC.sdk.retrofit.services;

import com.form1099NEC.sdk.model.TransmitRequest;
import com.form1099NEC.sdk.model.TransmitResponse;
import com.form1099NEC.sdk.retrofit.ApiService;
import com.form1099NEC.sdk.retrofit.ApiUtils;
import com.form1099NEC.sdk.retrofit.RetrofitResponse;
import com.form1099NEC.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class TransmitService {

    public static RetrofitResponse<TransmitResponse> transmit(String jwtToken, TransmitRequest request) {

        try {

            // Synchronous API call
            Response<TransmitResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .transmit(request)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                TransmitResponse failureData = ApiUtils.getFailureData(response, TransmitResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
