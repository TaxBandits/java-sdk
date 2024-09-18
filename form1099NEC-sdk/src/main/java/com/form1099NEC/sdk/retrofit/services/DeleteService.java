package com.form1099NEC.sdk.retrofit.services;

import com.form1099NEC.sdk.model.DeleteResponse;
import com.form1099NEC.sdk.retrofit.ApiService;
import com.form1099NEC.sdk.retrofit.ApiUtils;
import com.form1099NEC.sdk.retrofit.RetrofitResponse;
import com.form1099NEC.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class DeleteService {

    public static RetrofitResponse<DeleteResponse> delete(String jwtToken, String submissionId, String[] recordIds) {

        try {

            // Synchronous API call
            Response<DeleteResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .delete(submissionId, recordIds)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                DeleteResponse failureData = ApiUtils.getFailureData(response, DeleteResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
