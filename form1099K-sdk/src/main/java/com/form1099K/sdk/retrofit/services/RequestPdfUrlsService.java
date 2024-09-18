package com.form1099K.sdk.retrofit.services;

import com.form1099K.sdk.model.RequestPdfURLsRequest;
import com.form1099K.sdk.model.RequestPdfURLsResponse;
import com.form1099K.sdk.retrofit.ApiService;
import com.form1099K.sdk.retrofit.ApiUtils;
import com.form1099K.sdk.retrofit.RetrofitResponse;
import com.form1099K.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class RequestPdfUrlsService {

    public static RetrofitResponse<RequestPdfURLsResponse> requestPdfUrls(String jwtToken, RequestPdfURLsRequest request) {

        try {

            // Synchronous API call
            Response<RequestPdfURLsResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .requestPdfURLs(request)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                RequestPdfURLsResponse failureData = ApiUtils.getFailureData(response, RequestPdfURLsResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
