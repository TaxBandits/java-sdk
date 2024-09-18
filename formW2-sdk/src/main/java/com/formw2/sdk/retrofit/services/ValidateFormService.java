package com.formw2.sdk.retrofit.services;

import com.formw2.sdk.model.CreateFormW2Request;
import com.formw2.sdk.retrofit.ApiService;
import com.formw2.sdk.retrofit.ApiUtils;
import com.formw2.sdk.retrofit.RetrofitResponse;
import com.formw2.sdk.retrofit.RetrofitService;
import com.formw2.sdk.model.CreateFormW2Response;
import retrofit2.Response;

public class ValidateFormService {

    public static RetrofitResponse<CreateFormW2Response> validateForm(String jwtToken, CreateFormW2Request request) {

        try {

            // Synchronous API call
            Response<CreateFormW2Response> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .validateForm(request)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                CreateFormW2Response failureData = ApiUtils.getFailureData(response, CreateFormW2Response.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
