package com.form1099MISC.sdk.retrofit.services;

import com.form1099MISC.sdk.model.BusinessListResponse;
import com.form1099MISC.sdk.retrofit.ApiService;
import com.form1099MISC.sdk.retrofit.ApiUtils;
import com.form1099MISC.sdk.retrofit.RetrofitResponse;
import com.form1099MISC.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class BusinessListService {

    public static RetrofitResponse<BusinessListResponse> businessList(String jwtToken) {

        try {

            // Synchronous API call
            Response<BusinessListResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .businessList(1L, 10L)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                BusinessListResponse failureData = ApiUtils.getFailureData(response, BusinessListResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
