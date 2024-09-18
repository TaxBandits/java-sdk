package com.boir.sdk.retrofit.services.boir;

import com.boir.sdk.model.boir.create.request.CreateBoirRequest;
import com.boir.sdk.model.boir.create.response.CreateBoirResponse;
import com.boir.sdk.retrofit.ApiService;
import com.boir.sdk.retrofit.ApiUtils;
import com.boir.sdk.retrofit.RetrofitResponse;
import com.boir.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class CreateBOIRService {

    public static RetrofitResponse<CreateBoirResponse> createBOIR(String jwtToken, CreateBoirRequest request) {

        try {

            // Synchronous API call
            Response<CreateBoirResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .createBOIR(request)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                CreateBoirResponse failureData = ApiUtils.getFailureData(response, CreateBoirResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static RetrofitResponse<CreateBoirResponse> createBOIR1(String jwtToken, CreateBoirRequest request) {

        try {

            // Synchronous API call
            Response<Object> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .createBOIR1(request)
                    .execute();

            return null;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
