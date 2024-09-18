package com.boir.sdk.retrofit;

import com.boir.sdk.model.ping.PingResponse;
import retrofit2.Call;
import retrofit2.http.GET;

public interface PingService {

    /**
     * This allows you to verify whether the JWT is valid or not and also helps you identify any connectivity issues between your software and our API server before requesting endpoints.
     * Endpoint: /Utility/Ping
     * Method: GET
     **/
    @GET(ApiConfig.TBS_PUBLIC_API_BASE_URL + ApiConfig.UTILITY_PING)
    Call<PingResponse> ping();

}
