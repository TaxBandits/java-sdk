package com.formw2.sdk.retrofit.services;

import com.formw2.sdk.model.FormW2ListResponse;
import com.formw2.sdk.retrofit.ApiService;
import com.formw2.sdk.retrofit.ApiUtils;
import com.formw2.sdk.retrofit.RetrofitResponse;
import com.formw2.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class FormW2ListService {

    public static RetrofitResponse<FormW2ListResponse> form1099NecList(String jwtToken, String businessId) {

        try {

            // Synchronous API call
            Response<FormW2ListResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .formW2List(businessId, 1L, 10L)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                FormW2ListResponse failureData = ApiUtils.getFailureData(response, FormW2ListResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
