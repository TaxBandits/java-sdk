package com.boir.sdk.model.boir.get.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ForeignReportingCompany {

    @JsonProperty("FirstRegisteredTribalJurisdiction")
    private String FirstRegisteredTribalJurisdiction;

    @JsonProperty("FirstRegisteredState")
    private String FirstRegisteredState;

    @JsonProperty("OtherTribeName")
    private String OtherTribeName;

    public String getFirstRegisteredTribalJurisdiction() {
        return FirstRegisteredTribalJurisdiction;
    }

    public void setFirstRegisteredTribalJurisdiction(String firstRegisteredTribalJurisdiction) {
        FirstRegisteredTribalJurisdiction = firstRegisteredTribalJurisdiction;
    }

    public String getFirstRegisteredState() {
        return FirstRegisteredState;
    }

    public void setFirstRegisteredState(String firstRegisteredState) {
        FirstRegisteredState = firstRegisteredState;
    }

    public String getOtherTribeName() {
        return OtherTribeName;
    }

    public void setOtherTribeName(String otherTribeName) {
        OtherTribeName = otherTribeName;
    }
}
