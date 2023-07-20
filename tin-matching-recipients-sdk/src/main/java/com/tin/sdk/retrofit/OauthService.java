package com.tin.sdk.retrofit;

import com.tin.sdk.model.AccessTokenResponse;
import retrofit2.Call;
import retrofit2.http.GET;

public interface OauthService {

    /**
     * Check whether the Authentication based client credentials by API
     * Endpoint: /tbsauth
     * Method: GET
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_OAUTH + ApiConfig.TBS_AUTH)
    Call<AccessTokenResponse> tbsAuth();

}
