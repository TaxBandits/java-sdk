package com.form1099K.sdk.retrofit.services;

import com.form1099K.sdk.model.AccessTokenResponse;
import com.form1099K.sdk.retrofit.ApiUtils;
import com.form1099K.sdk.retrofit.OauthService;
import com.form1099K.sdk.retrofit.RetrofitResponse;
import com.form1099K.sdk.retrofit.RetrofitService;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import retrofit2.Response;

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

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

}
