package com.form1099MISC.sdk.retrofit.services;

import com.form1099MISC.sdk.model.GetForm1099MiscResponse;
import com.form1099MISC.sdk.retrofit.ApiService;
import com.form1099MISC.sdk.retrofit.ApiUtils;
import com.form1099MISC.sdk.retrofit.RetrofitResponse;
import com.form1099MISC.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class Form1099MiscGetService {

    public static RetrofitResponse<GetForm1099MiscResponse> form1099MiscGet(String jwtToken, String submissionId) {

        try {

            // Synchronous API call
            Response<GetForm1099MiscResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .form1099MiscGet(submissionId)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                GetForm1099MiscResponse failureData = ApiUtils.getFailureData(response, GetForm1099MiscResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}