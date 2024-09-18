package com.form1099NEC.sdk.retrofit.services;

import com.form1099NEC.sdk.model.GetForm1099NecResponse;
import com.form1099NEC.sdk.retrofit.ApiService;
import com.form1099NEC.sdk.retrofit.ApiUtils;
import com.form1099NEC.sdk.retrofit.RetrofitResponse;
import com.form1099NEC.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class Form1099NecGetService {

    public static RetrofitResponse<GetForm1099NecResponse> form1099NecGet(String jwtToken, String submissionId) {

        try {

            // Synchronous API call
            Response<GetForm1099NecResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .form1099NecGet(submissionId)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                GetForm1099NecResponse failureData = ApiUtils.getFailureData(response, GetForm1099NecResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
