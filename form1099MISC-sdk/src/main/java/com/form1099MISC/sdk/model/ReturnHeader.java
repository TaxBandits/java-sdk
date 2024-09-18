package com.form1099MISC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ReturnHeader {

    @JsonProperty("Business")
    private Business Business;

    public Business getBusiness() {
        return Business;
    }

    public void setBusiness(Business business) {
        Business = business;
    }
}
