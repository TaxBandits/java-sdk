package com.business.sdk.retrofit;

import com.business.sdk.utils.QuickTags;
import com.google.gson.Gson;
import okhttp3.ResponseBody;
import retrofit2.Response;

import java.util.HashMap;

public class ApiUtils {

    /**
     * Load the header by Authorization
     **/
    public static HashMap<String, String> getHeaders(String jwtToken) {
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put(QuickTags.AUTHORIZATION, jwtToken);
        hashMap.put(QuickTags.CONTENT_TYPE, "application/json");
        return hashMap;
    }

    /**
     * Get response from errorBody from Retrofit
     **/
    public static <T> T getFailureData(Response<T> response, Class<T> classType) {
        try {
            ResponseBody errorBody = response.errorBody();
            if (errorBody != null) {
                Object newObject = new Gson().fromJson(errorBody.charStream(), classType);
                return classType.cast(newObject);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
