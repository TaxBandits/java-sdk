package com.boir.sdk.retrofit.services.ping;

import com.boir.sdk.model.ping.PingResponse;
import com.boir.sdk.retrofit.ApiUtils;
import com.boir.sdk.retrofit.PingService;
import com.boir.sdk.retrofit.RetrofitResponse;
import com.boir.sdk.retrofit.RetrofitService;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import retrofit2.Response;

@Service
public class UtilityPingServices {

    public static RetrofitResponse<PingResponse> utilityPing(@NotNull String jws_token) {

        try {

            // Synchronous API call
            Response<PingResponse> response = new RetrofitService(true)
                    .createService(PingService.class, ApiUtils.getHeaders(jws_token))
                    .ping()
                    .execute();

            if (response.isSuccessful()) {
                return new RetrofitResponse<>(response.code(), response.message(), response.body());
            } else {
                PingResponse failureData = ApiUtils.getFailureData(response, PingResponse.class);
                return new RetrofitResponse<>(response.code(), response.message(), failureData);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

}
