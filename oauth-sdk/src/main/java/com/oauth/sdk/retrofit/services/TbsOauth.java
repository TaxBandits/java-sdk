package com.oauth.sdk.retrofit.services;

import com.oauth.sdk.model.AccessTokenResponse;
import com.oauth.sdk.retrofit.OauthService;
import com.oauth.sdk.retrofit.RetrofitResponse;
import com.oauth.sdk.retrofit.RetrofitService;
import org.springframework.stereotype.Service;
import retrofit2.Response;

import java.io.IOException;

@Service
public class TbsOauth {

    public static RetrofitResponse<AccessTokenResponse> tbsAuth(String jws_token) {

        try {

            Response<AccessTokenResponse> response = new RetrofitService(true)
                    .createService(OauthService.class, jws_token)
                    .tbsAuth()
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                return new RetrofitResponse<>(response.code(), response.message());
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

}
