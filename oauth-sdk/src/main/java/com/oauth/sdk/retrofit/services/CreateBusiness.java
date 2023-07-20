package com.oauth.sdk.retrofit.services;

import com.oauth.sdk.model.CreateBusinessRequest;
import com.oauth.sdk.model.CreateBusinessResponse;
import com.oauth.sdk.retrofit.ApiService;
import com.oauth.sdk.retrofit.ApiUtils;
import com.oauth.sdk.retrofit.RetrofitResponse;
import com.oauth.sdk.retrofit.RetrofitService;
import retrofit2.Response;

import java.io.IOException;

public class CreateBusiness {

    public static RetrofitResponse<CreateBusinessResponse> createBusiness(CreateBusinessRequest request) {

        try {

            Response<CreateBusinessResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(request.getJwtToken()))
                    .createBusiness(request)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                return new RetrofitResponse<>(response.code(), response.message());
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
