package com.form1099NEC.sdk.retrofit.services;

import com.form1099NEC.sdk.model.RequestDraftPdfUrlRequest;
import com.form1099NEC.sdk.model.RequestDraftPdfUrlResponse;
import com.form1099NEC.sdk.retrofit.ApiService;
import com.form1099NEC.sdk.retrofit.ApiUtils;
import com.form1099NEC.sdk.retrofit.RetrofitResponse;
import com.form1099NEC.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class RequestDraftPdfUrlService {

    public static RetrofitResponse<RequestDraftPdfUrlResponse> requestDraftPdfUrl(String jwtToken, RequestDraftPdfUrlRequest request) {

        try {

            // Synchronous API call
            Response<RequestDraftPdfUrlResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .requestDraftPdfUrl(request)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                RequestDraftPdfUrlResponse failureData = ApiUtils.getFailureData(response, RequestDraftPdfUrlResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
