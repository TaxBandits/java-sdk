package com.wh_certificate.sdk.retrofit.services;

import com.wh_certificate.sdk.model.GetResponse;
import com.wh_certificate.sdk.retrofit.ApiService;
import com.wh_certificate.sdk.retrofit.ApiUtils;
import com.wh_certificate.sdk.retrofit.RetrofitResponse;
import com.wh_certificate.sdk.retrofit.RetrofitService;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import retrofit2.Response;

@Service
public class GetServices {

    public static RetrofitResponse<GetResponse> get(@NotNull String jwtToken, @NotNull String businessId) {

        try {

            // Synchronous API call
            Response<GetResponse> response = new RetrofitService(true)
                    .createService(ApiService.class, ApiUtils.getHeaders(jwtToken))
                    .get(businessId)
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                GetResponse failureData = ApiUtils.getFailureData(response, GetResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

}
