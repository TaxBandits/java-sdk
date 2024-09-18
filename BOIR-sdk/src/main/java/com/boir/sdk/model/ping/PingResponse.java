package com.boir.sdk.model.ping;

import com.boir.sdk.model.Error;

import java.util.List;

public class PingResponse {
    private List<Error> Errors;
    private String TimeZone;
    private String APIVersion;
    private String StatusName;
    private Integer StatusCode;
    private String JWTExpiry;
    private String StatusMessage;

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

    public String getTimeZone() {
        return TimeZone;
    }

    public void setTimeZone(String timeZone) {
        TimeZone = timeZone;
    }

    public String getAPIVersion() {
        return APIVersion;
    }

    public void setAPIVersion(String APIVersion) {
        this.APIVersion = APIVersion;
    }

    public String getStatusName() {
        return StatusName;
    }

    public void setStatusName(String statusName) {
        StatusName = statusName;
    }

    public Integer getStatusCode() {
        return StatusCode;
    }

    public void setStatusCode(Integer statusCode) {
        StatusCode = statusCode;
    }

    public String getJWTExpiry() {
        return JWTExpiry;
    }

    public void setJWTExpiry(String JWTExpiry) {
        this.JWTExpiry = JWTExpiry;
    }

    public String getStatusMessage() {
        return StatusMessage;
    }

    public void setStatusMessage(String statusMessage) {
        StatusMessage = statusMessage;
    }
}
