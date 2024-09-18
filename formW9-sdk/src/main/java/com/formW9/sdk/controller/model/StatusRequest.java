package com.formW9.sdk.controller.model;

public class StatusRequest {

    private String recipientTINType;
    private String recipientTIN;

    public String getRecipientTINType() {
        return recipientTINType;
    }

    public void setRecipientTINType(String recipientTINType) {
        this.recipientTINType = recipientTINType;
    }

    public String getRecipientTIN() {
        return recipientTIN;
    }

    public void setRecipientTIN(String recipientTIN) {
        this.recipientTIN = recipientTIN;
    }
}
