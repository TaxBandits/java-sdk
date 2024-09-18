package com.boir.sdk.utils;

import org.jetbrains.annotations.NotNull;
import org.json.JSONObject;

import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class JwsUtils {

    /**
     * Getting EPOCH date and time as "MMM dd yyyy HH:mm:ss.SSS zzz"
     **/
    private static long getCurrentDateTime() {
        try {
            Date today = Calendar.getInstance().getTime();
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MMM dd yyyy HH:mm:ss.SSS zzz", Locale.getDefault());
            String currentTime = simpleDateFormat.format(today);
            Date date = simpleDateFormat.parse(currentTime);
            if (date != null) return date.getTime() / 1000;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0L;
    }

    /**
     * Generate the payload for getting the JWS token
     * Parameters: String clientId, String userToken
     **/
    public static String getPayload(@NotNull String clientId, @NotNull String userToken) {
        try {
            long epoch = getCurrentDateTime();
            JSONObject payload = new JSONObject();
            payload.put("iss", clientId);
            payload.put("sub", clientId);
            payload.put("aud", userToken);
            payload.put("iat", epoch);
            return JwtUtils.encode(payload.toString().getBytes(StandardCharsets.UTF_8));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

}
