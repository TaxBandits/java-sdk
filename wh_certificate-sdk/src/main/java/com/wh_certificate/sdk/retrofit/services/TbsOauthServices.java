package com.wh_certificate.sdk.retrofit.services;

import com.wh_certificate.sdk.model.AccessTokenResponse;
import com.wh_certificate.sdk.retrofit.ApiUtils;
import com.wh_certificate.sdk.retrofit.OauthService;
import com.wh_certificate.sdk.retrofit.RetrofitResponse;
import com.wh_certificate.sdk.retrofit.RetrofitService;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import retrofit2.Response;

import java.io.IOException;

@Service
public class TbsOauthServices {

    public static RetrofitResponse<AccessTokenResponse> tbsAuth(@NotNull String jws_token) {

        try {

            // Synchronous API call
            Response<AccessTokenResponse> response = new RetrofitService(true)
                    .createService(OauthService.class, ApiUtils.getOauthHeaders(jws_token))
                    .tbsAuth()
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                AccessTokenResponse failureData = ApiUtils.getFailureData(response, AccessTokenResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

}
