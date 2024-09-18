package com.form1099MISC.sdk.retrofit.services;

import com.form1099MISC.sdk.model.CreateForm1099MiscRequest;
import com.form1099MISC.sdk.model.CreateForm1099MiscResponse;
import com.form1099MISC.sdk.retrofit.ApiService;
import com.form1099MISC.sdk.retrofit.ApiUtils;
import com.form1099MISC.sdk.retrofit.RetrofitResponse;
import com.form1099MISC.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class Form1099MiscCreateOrUpdateService {

    public static RetrofitResponse<CreateForm1099MiscResponse> form1099MiscCreateOrUpdate(String jwtToken, boolean isUpdate, CreateForm1099MiscRequest request) {

        try {

            // Synchronous API call as Create or Update
            ApiService ApiService = new RetrofitService(false).createService(ApiService.class, ApiUtils.getHeaders(jwtToken));
            Response<CreateForm1099MiscResponse> response = (isUpdate ? (ApiService.form1099MiscUpdate(request)) : (ApiService.form1099MiscCreate(request))).execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                CreateForm1099MiscResponse failureData = ApiUtils.getFailureData(response, CreateForm1099MiscResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
