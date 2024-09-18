package com.boir.sdk.controller.utils;

import com.boir.sdk.controller.utils.core.PingModel;
import com.boir.sdk.model.Error;
import com.boir.sdk.model.ping.PingResponse;
import com.boir.sdk.retrofit.services.ping.UtilityPingServices;
import kotlin.Triple;
import org.jetbrains.annotations.NotNull;

import java.util.List;

public class PingUtils {

    public static PingModel checkServerAndJWT(@NotNull String jwtToken) {
        PingResponse pingResponse = UtilityPingServices.utilityPing(jwtToken).getData();
        Triple<Integer, String, List<Error>> status = pingResponse != null ? new Triple<>(pingResponse.getStatusCode(), pingResponse.getStatusMessage(), pingResponse.getErrors()) : new Triple<>(500, "Site under maintenance, please again later! ", null);
        boolean isSuccess = status.getThird() == null || status.getThird().isEmpty();
        return new PingModel(isSuccess, status);
    }

}
