package com.tin.sdk.model;

public class TinRequest {

    private TINMatchingDetails TINMatchingDetails;

    public TinRequest(TINMatchingDetails TINMatchingDetails) {
        this.TINMatchingDetails = TINMatchingDetails;
    }

    public TINMatchingDetails getTINMatchingDetails() {
        return TINMatchingDetails;
    }

    public void setTINMatchingDetails(TINMatchingDetails TINMatchingDetails) {
        this.TINMatchingDetails = TINMatchingDetails;
    }

}
