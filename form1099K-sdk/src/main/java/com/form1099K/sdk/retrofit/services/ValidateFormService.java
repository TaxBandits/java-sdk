package com.form1099K.sdk.retrofit.services;

import com.form1099K.sdk.model.CreateForm1099KRequest;
import com.form1099K.sdk.model.CreateForm1099KResponse;
import com.form1099K.sdk.retrofit.ApiService;
import com.form1099K.sdk.retrofit.ApiUtils;
import com.form1099K.sdk.retrofit.RetrofitResponse;
import com.form1099K.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class ValidateFormService {

    public static RetrofitResponse<CreateForm1099KResponse> validateForm(String jwtToken, CreateForm1099KRequest request) {

        try {

            // Synchronous API call
            Response<CreateForm1099KResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .validateForm(request)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                CreateForm1099KResponse failureData = ApiUtils.getFailureData(response, CreateForm1099KResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
