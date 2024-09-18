package com.boir.sdk.retrofit.services.business;

import com.boir.sdk.model.business.BusinessListResponse;
import com.boir.sdk.retrofit.ApiService;
import com.boir.sdk.retrofit.ApiUtils;
import com.boir.sdk.retrofit.RetrofitResponse;
import com.boir.sdk.retrofit.RetrofitService;
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
