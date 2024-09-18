package com.form1099NEC.sdk.controller.rest_controller;

import com.form1099NEC.sdk.model.AccessTokenResponse;
import com.form1099NEC.sdk.retrofit.ApiConfig;
import com.form1099NEC.sdk.retrofit.services.TbsOauthServices;
import com.form1099NEC.sdk.utils.JwsUtils;
import com.form1099NEC.sdk.utils.JwtUtils;
import com.form1099NEC.sdk.utils.QuickTags;
import com.form1099NEC.sdk.utils.StringUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

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
                Long ExpiresIn = accessTokenResponse.getExpiresIn();
                if (StringUtils.isValidString(accessToken)) {
                    request.getSession().setAttribute(QuickTags.ACCESS_TOKEN, accessToken);
                    request.getSession().setAttribute(QuickTags.EXPIRES_IN, ExpiresIn);

                    long accessTokenUpdatedOn = Instant.now().getEpochSecond();
                    request.getSession().setAttribute(QuickTags.ACCESS_TOKEN_UPDATED_ON, accessTokenUpdatedOn);
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
    public String removeJwt(HttpServletRequest request) {
        try {
            if (request != null) {
                HttpSession httpSession = request.getSession();
                if (httpSession != null) {
                    httpSession.removeAttribute(QuickTags.ACCESS_TOKEN);
                    httpSession.removeAttribute(QuickTags.EXPIRES_IN);
                    httpSession.removeAttribute(QuickTags.ACCESS_TOKEN_UPDATED_ON);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Something wrong while JWT is removing!";
        }
        return "JWT removed!";
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

                    // Get JWT token, ExpiresIn and accessTokenUpdatedOn from session
                    Object jwtTokenObject = httpSession.getAttribute(QuickTags.ACCESS_TOKEN);
                    Object expiresInObject = httpSession.getAttribute(QuickTags.EXPIRES_IN);
                    Object accessTokenUpdatedOnObject = httpSession.getAttribute(QuickTags.ACCESS_TOKEN_UPDATED_ON);

                    boolean isExpired = false;
                    if (accessTokenUpdatedOnObject instanceof Long && expiresInObject instanceof Long) {
                        long currentEpochSecond = Instant.now().getEpochSecond();
                        long accessTokenUpdatedOn = (Long) accessTokenUpdatedOnObject;
                        long expiresIn = (Long) expiresInObject;

                        //  Check if the access token is expired or not
                        isExpired = (currentEpochSecond - accessTokenUpdatedOn) >= expiresIn;
                    }

                    //  If the object is null then the JWT token should be store into session
                    if (jwtTokenObject == null || isExpired) {
                        String jwtToken = new OauthRestController().getJwt(request);
                        if (StringUtils.isValidString(jwtToken)) return jwtToken;
                    } else {
                        return jwtTokenObject.toString();
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
