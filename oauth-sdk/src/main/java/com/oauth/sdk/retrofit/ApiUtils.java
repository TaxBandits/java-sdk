package com.oauth.sdk.retrofit;

import com.oauth.sdk.utils.QuickTags;

import java.util.HashMap;

public class ApiUtils {

    /**
     * Load the header by Authorization
     **/
    public static HashMap<String, String> getHeaders(String jwtToken) {
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put(QuickTags.AUTHORIZATION, jwtToken);
        return hashMap;
    }

}
