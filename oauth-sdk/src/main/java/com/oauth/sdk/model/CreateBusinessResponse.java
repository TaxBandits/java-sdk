package com.oauth.sdk.model;

import java.util.List;

public class CreateBusinessResponse {

    public String BusinessId;
    public String PayerRef;
    public boolean IsEIN;
    public String EINorSSN;
    public String BusinessNm;
    public List<Error> Errors;

    public String getBusinessId() {
        return BusinessId;
    }

    public void setBusinessId(String businessId) {
        BusinessId = businessId;
    }

    public String getPayerRef() {
        return PayerRef;
    }

    public void setPayerRef(String payerRef) {
        PayerRef = payerRef;
    }

    public boolean isEIN() {
        return IsEIN;
    }

    public void setEIN(boolean EIN) {
        IsEIN = EIN;
    }

    public String getEINorSSN() {
        return EINorSSN;
    }

    public void setEINorSSN(String EINorSSN) {
        this.EINorSSN = EINorSSN;
    }

    public String getBusinessNm() {
        return BusinessNm;
    }

    public void setBusinessNm(String businessNm) {
        BusinessNm = businessNm;
    }

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

}
