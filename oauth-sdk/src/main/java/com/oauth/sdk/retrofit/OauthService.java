package com.oauth.sdk.retrofit;

import com.oauth.sdk.model.AccessTokenResponse;
import retrofit2.Call;
import retrofit2.http.GET;

public interface OauthService {

    @GET(ApiConfig.TBS_PUBLIC_API_OAUTH + ApiConfig.TBS_AUTH)
    Call<AccessTokenResponse> tbsAuth();

}
