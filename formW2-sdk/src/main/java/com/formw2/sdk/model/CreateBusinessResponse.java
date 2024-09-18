package com.formw2.sdk.model;

import java.util.List;

public class CreateBusinessResponse {

    private String BusinessId;
    private String BusinessNm;
    private String EINorSSN;
    private List<Error> Errors;
    private Boolean IsEIN;
    private String PayerRef;
    private Long StatusCode;
    private String StatusMessage;
    private String StatusName;

    public String getBusinessId() {
        return BusinessId;
    }

    public void setBusinessId(String businessId) {
        BusinessId = businessId;
    }

    public String getBusinessNm() {
        return BusinessNm;
    }

    public void setBusinessNm(String businessNm) {
        BusinessNm = businessNm;
    }

    public String getEINorSSN() {
        return EINorSSN;
    }

    public void setEINorSSN(String EINorSSN) {
        this.EINorSSN = EINorSSN;
    }

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

    public Boolean getEIN() {
        return IsEIN;
    }

    public void setEIN(Boolean EIN) {
        IsEIN = EIN;
    }

    public String getPayerRef() {
        return PayerRef;
    }

    public void setPayerRef(String payerRef) {
        PayerRef = payerRef;
    }

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
}
