package com.tin.sdk.retrofit.services;

import com.tin.sdk.model.TinResponse;
import com.tin.sdk.retrofit.ApiService;
import com.tin.sdk.retrofit.ApiUtils;
import com.tin.sdk.retrofit.RetrofitResponse;
import com.tin.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class CancelRequestService {

    public static RetrofitResponse<TinResponse> cancelRequest(String jwtToken, String submissionId, String[] recordIds) {

        try {

            // Synchronous API call
            Response<TinResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .cancelRequest(submissionId, recordIds)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                TinResponse failureData = ApiUtils.getFailureData(response, TinResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
