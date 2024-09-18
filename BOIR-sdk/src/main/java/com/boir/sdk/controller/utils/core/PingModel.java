package com.boir.sdk.controller.utils.core;

import com.boir.sdk.model.Error;
import kotlin.Triple;

import java.util.List;

public class PingModel {

    private Boolean IsVerified;
    private Integer StatusCode;
    private String StatusMessage;
    private List<Error> Errors;

    public PingModel(Boolean isVerified, Triple<Integer, String, List<Error>> status) {
        IsVerified = isVerified;
        StatusCode = status.getFirst();
        StatusMessage = status.getSecond();
        Errors = status.getThird();
    }

    public Boolean getIsVerified() {
        return IsVerified;
    }

    public void setIsVerified(Boolean verified) {
        IsVerified = verified;
    }

    public Integer getStatusCode() {
        return StatusCode;
    }

    public void setStatusCode(Integer statusCode) {
        StatusCode = statusCode;
    }

    public String getStatusMessage() {
        return StatusMessage;
    }

    public void setStatusMessage(String statusMessage) {
        StatusMessage = statusMessage;
    }

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }
}
