package com.form1099K.sdk.retrofit.services;

import com.form1099K.sdk.model.Form1099KListResponse;
import com.form1099K.sdk.retrofit.ApiService;
import com.form1099K.sdk.retrofit.ApiUtils;
import com.form1099K.sdk.retrofit.RetrofitResponse;
import com.form1099K.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class Form1099KListService {

    public static RetrofitResponse<Form1099KListResponse> form1099KList(String jwtToken, String businessId) {

        try {

            // Synchronous API call
            Response<Form1099KListResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .form1099KList(businessId, 1L, 10L)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                Form1099KListResponse failureData = ApiUtils.getFailureData(response, Form1099KListResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
