package com.business.sdk.model;

import java.util.List;

public class GetBusinessResponse {

    private Long StatusCode;
    private String StatusMessage;
    private String StatusName;

    private BusinessGet Business;

    private List<Error> Errors;

    public Long getStatusCode() {
        return StatusCode;
    }

    public void setStatusCode(Long statusCode) {
        StatusCode = statusCode;
    }

    public String getStatusMessage() {
        return StatusMessage;
    }

    public void setStatusMessage(String statusMessage) {
        StatusMessage = statusMessage;
    }

    public String getStatusName() {
        return StatusName;
    }

    public void setStatusName(String statusName) {
        StatusName = statusName;
    }

    public BusinessGet getBusiness() {
        return Business;
    }

    public void setBusiness(BusinessGet business) {
        Business = business;
    }

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }
}
