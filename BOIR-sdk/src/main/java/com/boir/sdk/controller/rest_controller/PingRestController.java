package com.boir.sdk.controller.rest_controller;

import com.boir.sdk.model.ping.PingResponse;
import com.boir.sdk.retrofit.services.ping.UtilityPingServices;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PingRestController {

    /**
     * Before making any API endpoint requests, you can check the connectivity and response time of our server using the Ping endpoint.
     * Endpoint: /ping
     * Method: GET
     * No need to pass parameters
     **/
    @GetMapping("/ping")
    public PingResponse ping(HttpServletRequest httpServletRequest) {
        String jwtToken = new OauthRestController().readJwt(httpServletRequest);
        return UtilityPingServices.utilityPing(jwtToken).getData();
    }

}
