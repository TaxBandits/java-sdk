package com.formW9.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Requester {

    @JsonProperty("BusinessId")
    private String BusinessId;
    private String BusinessNm;
    private String PayerRef;
    private String TIN;
    private String TINType;

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

    public String getPayerRef() {
        return PayerRef;
    }

    public void setPayerRef(String payerRef) {
        PayerRef = payerRef;
    }

    public String getTIN() {
        return TIN;
    }

    public void setTIN(String TIN) {
        this.TIN = TIN;
    }

    public String getTINType() {
        return TINType;
    }

    public void setTINType(String TINType) {
        this.TINType = TINType;
    }
}
