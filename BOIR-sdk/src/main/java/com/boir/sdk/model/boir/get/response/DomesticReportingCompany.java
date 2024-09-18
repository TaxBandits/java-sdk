package com.boir.sdk.model.boir.get.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DomesticReportingCompany {

    @JsonProperty("FormedState")
    private String FormedState;

    @JsonProperty("OtherTribeName")
    private String OtherTribeName;

    @JsonProperty("FormedTribalJurisdiction")
    private String FormedTribalJurisdiction;

    public String getFormedState() {
        return FormedState;
    }

    public void setFormedState(String formedState) {
        FormedState = formedState;
    }

    public String getOtherTribeName() {
        return OtherTribeName;
    }

    public void setOtherTribeName(String otherTribeName) {
        OtherTribeName = otherTribeName;
    }

    public String getFormedTribalJurisdiction() {
        return FormedTribalJurisdiction;
    }

    public void setFormedTribalJurisdiction(String formedTribalJurisdiction) {
        FormedTribalJurisdiction = formedTribalJurisdiction;
    }
}
