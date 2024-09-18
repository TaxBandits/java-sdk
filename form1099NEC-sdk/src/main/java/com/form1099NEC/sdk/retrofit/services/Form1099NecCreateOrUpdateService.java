package com.form1099NEC.sdk.retrofit.services;

import com.form1099NEC.sdk.model.CreateForm1099NecRequest;
import com.form1099NEC.sdk.model.CreateForm1099NecResponse;
import com.form1099NEC.sdk.retrofit.ApiService;
import com.form1099NEC.sdk.retrofit.ApiUtils;
import com.form1099NEC.sdk.retrofit.RetrofitResponse;
import com.form1099NEC.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class Form1099NecCreateOrUpdateService {

    public static RetrofitResponse<CreateForm1099NecResponse> form1099NecCreateOrUpdate(String jwtToken, boolean isUpdate, CreateForm1099NecRequest request) {

        try {

            // Synchronous API call as Create or Update
            ApiService ApiService = new RetrofitService(false).createService(ApiService.class, ApiUtils.getHeaders(jwtToken));
            Response<CreateForm1099NecResponse> response = (isUpdate ? (ApiService.form1099NecUpdate(request)) : (ApiService.form1099NecCreate(request))).execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                CreateForm1099NecResponse failureData = ApiUtils.getFailureData(response, CreateForm1099NecResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
