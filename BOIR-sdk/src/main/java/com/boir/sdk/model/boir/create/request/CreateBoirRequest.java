package com.boir.sdk.model.boir.create.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CreateBoirRequest {
    @JsonProperty("ReturnHeader")
    private ReturnHeader ReturnHeader;
    @JsonProperty("ReturnData")
    private ReturnData ReturnData;

    public void setReturnHeader(ReturnHeader ReturnHeader) {
        this.ReturnHeader = ReturnHeader;
    }

    public ReturnHeader getReturnHeader() {
        return ReturnHeader;
    }

    public void setReturnData(ReturnData ReturnData) {
        this.ReturnData = ReturnData;
    }

    public ReturnData getReturnData() {
        return ReturnData;
    }
}
