package com.form1099NEC.sdk.retrofit.services;

import com.form1099NEC.sdk.model.CreateForm1099NecRequest;
import com.form1099NEC.sdk.model.CreateForm1099NecResponse;
import com.form1099NEC.sdk.retrofit.ApiService;
import com.form1099NEC.sdk.retrofit.ApiUtils;
import com.form1099NEC.sdk.retrofit.RetrofitResponse;
import com.form1099NEC.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class ValidateFormService {

    public static RetrofitResponse<CreateForm1099NecResponse> validateForm(String jwtToken, CreateForm1099NecRequest request) {

        try {

            // Synchronous API call
            Response<CreateForm1099NecResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .validateForm(request)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                CreateForm1099NecResponse failureData = ApiUtils.getFailureData(response, CreateForm1099NecResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
