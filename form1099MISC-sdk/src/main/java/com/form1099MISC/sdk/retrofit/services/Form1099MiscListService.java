package com.form1099MISC.sdk.retrofit.services;

import com.form1099MISC.sdk.model.Form1099MiscListResponse;
import com.form1099MISC.sdk.retrofit.ApiService;
import com.form1099MISC.sdk.retrofit.ApiUtils;
import com.form1099MISC.sdk.retrofit.RetrofitResponse;
import com.form1099MISC.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class Form1099MiscListService {

    public static RetrofitResponse<Form1099MiscListResponse> form1099MiscList(String jwtToken, String businessId) {

        try {

            // Synchronous API call
            Response<Form1099MiscListResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .form1099MiscList(businessId, 1L, 10L)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                Form1099MiscListResponse failureData = ApiUtils.getFailureData(response, Form1099MiscListResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
