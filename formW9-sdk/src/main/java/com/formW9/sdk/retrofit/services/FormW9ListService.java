package com.formW9.sdk.retrofit.services;

import com.formW9.sdk.model.FormW9ListResponse;
import com.formW9.sdk.retrofit.ApiService;
import com.formW9.sdk.retrofit.ApiUtils;
import com.formW9.sdk.retrofit.RetrofitResponse;
import com.formW9.sdk.retrofit.RetrofitService;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import retrofit2.Response;

@Service
public class FormW9ListService {

    public static RetrofitResponse<FormW9ListResponse> formW9List(@NotNull String jwtToken, @NotNull String businessId) {

        try {

            // Synchronous API call
            Response<FormW9ListResponse> response = new RetrofitService(true)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .formW9List(businessId, 1L, 10L)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                FormW9ListResponse failureData = ApiUtils.getFailureData(response, FormW9ListResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

}
