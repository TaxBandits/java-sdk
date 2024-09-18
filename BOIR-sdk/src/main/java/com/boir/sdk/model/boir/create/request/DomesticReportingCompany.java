package com.boir.sdk.model.boir.create.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DomesticReportingCompany {
    @JsonProperty("FormedState")
    private String FormedState;
    @JsonProperty("OtherTribeNm")
    private String OtherTribeNm;
    @JsonProperty("FormedTribalJurisdiction")
    private String FormedTribalJurisdiction;

    public String getFormedState() {
        return FormedState;
    }

    public void setFormedState(String formedState) {
        FormedState = formedState;
    }

    public String getOtherTribeNm() {
        return OtherTribeNm;
    }

    public void setOtherTribeNm(String otherTribeNm) {
        OtherTribeNm = otherTribeNm;
    }

    public String getFormedTribalJurisdiction() {
        return FormedTribalJurisdiction;
    }

    public void setFormedTribalJurisdiction(String formedTribalJurisdiction) {
        FormedTribalJurisdiction = formedTribalJurisdiction;
    }
}
