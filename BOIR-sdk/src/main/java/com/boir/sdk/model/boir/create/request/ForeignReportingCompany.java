package com.boir.sdk.model.boir.create.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ForeignReportingCompany {
    @JsonProperty("FirstRegisteredTribalJurisdiction")
    private String FirstRegisteredTribalJurisdiction;
    @JsonProperty("OtherTribeNm")
    private String OtherTribeNm;
    @JsonProperty("FirstRegisteredState")
    private String FirstRegisteredState;

    public String getFirstRegisteredTribalJurisdiction() {
        return FirstRegisteredTribalJurisdiction;
    }

    public void setFirstRegisteredTribalJurisdiction(String firstRegisteredTribalJurisdiction) {
        this.FirstRegisteredTribalJurisdiction = firstRegisteredTribalJurisdiction;
    }

    public String getOtherTribeNm() {
        return OtherTribeNm;
    }

    public void setOtherTribeNm(String otherTribeNm) {
        this.OtherTribeNm = otherTribeNm;
    }

    public String getFirstRegisteredState() {
        return FirstRegisteredState;
    }

    public void setFirstRegisteredState(String firstRegisteredState) {
        this.FirstRegisteredState = firstRegisteredState;
    }
}
