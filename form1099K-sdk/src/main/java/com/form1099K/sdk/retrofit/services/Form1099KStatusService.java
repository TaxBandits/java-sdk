package com.form1099K.sdk.retrofit.services;

import com.form1099K.sdk.model.StatusForm1099KResponse;
import com.form1099K.sdk.retrofit.ApiService;
import com.form1099K.sdk.retrofit.ApiUtils;
import com.form1099K.sdk.retrofit.RetrofitResponse;
import com.form1099K.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class Form1099KStatusService {

    public static RetrofitResponse<StatusForm1099KResponse> form1099KStatus(String jwtToken, String submissionId) {

        try {

            // Synchronous API call
            Response<StatusForm1099KResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .form1099KStatus(submissionId)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                StatusForm1099KResponse failureData = ApiUtils.getFailureData(response, StatusForm1099KResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
