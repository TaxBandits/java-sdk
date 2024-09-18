package com.form1099K.sdk.retrofit.services;

import com.form1099K.sdk.model.CreateForm1099KRequest;
import com.form1099K.sdk.model.CreateForm1099KResponse;
import com.form1099K.sdk.retrofit.ApiService;
import com.form1099K.sdk.retrofit.ApiUtils;
import com.form1099K.sdk.retrofit.RetrofitResponse;
import com.form1099K.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class Form1099KCreateOrUpdateService {

    public static RetrofitResponse<CreateForm1099KResponse> form1099KCreateOrUpdate(String jwtToken, boolean isUpdate, CreateForm1099KRequest request) {

        try {

            // Synchronous API call as Create or Update
            ApiService ApiService = new RetrofitService(false).createService(ApiService.class, ApiUtils.getHeaders(jwtToken));
            Response<CreateForm1099KResponse> response = (isUpdate ? (ApiService.form1099KUpdate(request)) : (ApiService.form1099KCreate(request))).execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                CreateForm1099KResponse failureData = ApiUtils.getFailureData(response, CreateForm1099KResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
