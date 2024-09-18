package com.formW9.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Recipient {

    @JsonProperty("Email")
    private String Email;
    @JsonProperty("Name")
    private String Name;
    @JsonProperty("PayeeRef")
    private String PayeeRef;
    @JsonProperty("IsTINMatching")
    private Boolean IsTINMatching;

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getPayeeRef() {
        return PayeeRef;
    }

    public void setPayeeRef(String payeeRef) {
        PayeeRef = payeeRef;
    }

    public Boolean getIsTINMatching() {
        return IsTINMatching;
    }

    public void setIsTINMatching(Boolean isTINMatching) {
        IsTINMatching = isTINMatching;
    }
}
