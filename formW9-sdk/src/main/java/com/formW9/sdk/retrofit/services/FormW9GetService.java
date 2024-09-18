package com.formW9.sdk.retrofit.services;

import com.formW9.sdk.controller.model.PayeeRefRequest;
import com.formW9.sdk.model.FormW9GetResponse;
import com.formW9.sdk.retrofit.ApiService;
import com.formW9.sdk.retrofit.ApiUtils;
import com.formW9.sdk.retrofit.RetrofitResponse;
import com.formW9.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class FormW9GetService {

    public static RetrofitResponse<FormW9GetResponse> formW9Get(String jwtToken, PayeeRefRequest request) {

        try {

            // Synchronous API call
            Response<FormW9GetResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .getFormW9(request.getPayeeRef())
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                FormW9GetResponse failureData = ApiUtils.getFailureData(response, FormW9GetResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
