package com.boir.sdk.retrofit.services.oauth;

import com.boir.sdk.model.oauth.AccessTokenResponse;
import com.boir.sdk.retrofit.ApiUtils;
import com.boir.sdk.retrofit.OauthService;
import com.boir.sdk.retrofit.RetrofitResponse;
import com.boir.sdk.retrofit.RetrofitService;
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
