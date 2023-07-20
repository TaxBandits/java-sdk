package com.tin.sdk.controller.rest_controller;

import com.tin.sdk.model.AccessTokenResponse;
import com.tin.sdk.retrofit.ApiConfig;
import com.tin.sdk.retrofit.services.TbsOauthServices;
import com.tin.sdk.utils.JwsUtils;
import com.tin.sdk.utils.JwtUtils;
import com.tin.sdk.utils.QuickTags;
import com.tin.sdk.utils.StringUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OauthRestController {

    /**
     * Get JWT token from API and storing local storage as session
     * Endpoint: /getJwt
     * Method: GET
     * No need to pass parameters
     **/
    @GetMapping("/getJwt")
    public String getJwt(HttpServletRequest request) {
        try {
            String payload = JwsUtils.getPayload(ApiConfig.TBS_API_CONSOLE_CLIENT_ID, ApiConfig.TBS_API_CONSOLE_USER_TOKEN);
            String jws_token = JwtUtils.getJwtToken(payload, ApiConfig.TBS_API_CONSOLE_CLIENT_SECRET_KEY);
            AccessTokenResponse accessTokenResponse = TbsOauthServices.tbsAuth(jws_token).getData();

            if (accessTokenResponse != null) {

                String accessToken = accessTokenResponse.getAccessToken();
                if (StringUtils.isValidString(accessToken)) {
                    request.getSession().setAttribute(QuickTags.ACCESS_TOKEN, accessToken);
                    // Return the access token
                    return accessToken;

                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;

    }

    /**
     * Remove JWT token from local storage as session
     * Endpoint: /removeJwt
     * Method: GET
     * No need to pass parameters
     **/
    @GetMapping("/removeJwt")
    public void removeJwt(HttpServletRequest request) {
        try {
            if (request != null) {
                HttpSession httpSession = request.getSession();
                if (httpSession != null)
                    httpSession.removeAttribute(QuickTags.ACCESS_TOKEN);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Remove JWT token from local storage as session
     * Endpoint: /removeJwt
     * Method: GET
     * No need to pass parameters
     **/
    @GetMapping("/readJwt")
    public String readJwt(HttpServletRequest request) {
        try {
            if (request != null) {

                HttpSession httpSession = request.getSession();
                if (httpSession != null) {

                    // Get JWT token from session
                    Object object = httpSession.getAttribute(QuickTags.ACCESS_TOKEN);

                    // If the object is null then the JWT token should be store into session
                    if (object == null) {
                        String jwtToken = new OauthRestController().getJwt(request);
                        if (StringUtils.isValidString(jwtToken)) return jwtToken;
                    } else {
                        return object.toString();
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
