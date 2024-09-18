package com.boir.sdk.retrofit.services.boir;

import com.boir.sdk.model.boir.get.response.GetBOIRResponse;
import com.boir.sdk.retrofit.ApiService;
import com.boir.sdk.retrofit.ApiUtils;
import com.boir.sdk.retrofit.RetrofitResponse;
import com.boir.sdk.retrofit.RetrofitService;
import retrofit2.Response;

public class GetBOIRService {

    public static RetrofitResponse<GetBOIRResponse> getBOIR(String jwtToken, String submissionId, String reportNumber) {

        try {

            // Synchronous API call
            Response<GetBOIRResponse> response = new RetrofitService(false)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .getBOIR(submissionId, reportNumber)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                GetBOIRResponse failureData = ApiUtils.getFailureData(response, GetBOIRResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
