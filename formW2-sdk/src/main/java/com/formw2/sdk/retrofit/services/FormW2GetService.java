package com.formw2.sdk.retrofit.services;

import com.formw2.sdk.model.GetFormW2Response;
import com.formw2.sdk.retrofit.ApiService;
import com.formw2.sdk.retrofit.ApiUtils;
import com.formw2.sdk.retrofit.RetrofitResponse;
import com.formw2.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class FormW2GetService {

    public static RetrofitResponse<GetFormW2Response> form1099NecGet(String jwtToken, String submissionId) {

        try {

            // Synchronous API call
            Response<GetFormW2Response> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .formW2Get(submissionId)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                GetFormW2Response failureData = ApiUtils.getFailureData(response, GetFormW2Response.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
