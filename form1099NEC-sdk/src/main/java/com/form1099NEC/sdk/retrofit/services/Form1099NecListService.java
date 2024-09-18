package com.form1099NEC.sdk.retrofit.services;

import com.form1099NEC.sdk.model.FormNec1099ListResponse;
import com.form1099NEC.sdk.retrofit.ApiService;
import com.form1099NEC.sdk.retrofit.ApiUtils;
import com.form1099NEC.sdk.retrofit.RetrofitResponse;
import com.form1099NEC.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class Form1099NecListService {

    public static RetrofitResponse<FormNec1099ListResponse> form1099NecList(String jwtToken, String businessId) {

        try {

            // Synchronous API call
            Response<FormNec1099ListResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .form1099NecList(businessId, 1L, 10L)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                FormNec1099ListResponse failureData = ApiUtils.getFailureData(response, FormNec1099ListResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
