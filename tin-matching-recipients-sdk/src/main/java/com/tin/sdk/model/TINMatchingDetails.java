package com.tin.sdk.model;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

public class TINMatchingDetails {

    @SerializedName(value = "business", alternate = {"Business"})
    private Business Business;
    @SerializedName(value = "recipients", alternate = {"Recipients"})
    private ArrayList<Recipients> Recipients;

    public Business getBusiness() {
        return Business;
    }

    public void setBusiness(Business business) {
        Business = business;
    }

    public ArrayList<Recipients> getRecipients() {
        return Recipients;
    }

    public void setRecipients(ArrayList<Recipients> recipients) {
        Recipients = recipients;
    }

}
