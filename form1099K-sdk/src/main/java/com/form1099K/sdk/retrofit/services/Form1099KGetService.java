package com.form1099K.sdk.retrofit.services;

import com.form1099K.sdk.model.GetForm1099KResponse;
import com.form1099K.sdk.retrofit.ApiService;
import com.form1099K.sdk.retrofit.ApiUtils;
import com.form1099K.sdk.retrofit.RetrofitResponse;
import com.form1099K.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class Form1099KGetService {

    public static RetrofitResponse<GetForm1099KResponse> form1099KGet(String jwtToken, String submissionId) {

        try {

            // Synchronous API call
            Response<GetForm1099KResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .form1099KGet(submissionId)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                GetForm1099KResponse failureData = ApiUtils.getFailureData(response, GetForm1099KResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
