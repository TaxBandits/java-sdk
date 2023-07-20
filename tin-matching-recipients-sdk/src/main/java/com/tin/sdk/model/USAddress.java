package com.tin.sdk.model;

import com.google.gson.annotations.SerializedName;

public class USAddress {

    @SerializedName(value = "address1", alternate = {"Address1"})
    private String Address1;
    @SerializedName(value = "address2", alternate = {"Address2"})
    private String Address2;
    @SerializedName(value = "city", alternate = {"City"})
    private String City;
    @SerializedName(value = "state", alternate = {"State"})
    private String State;
    @SerializedName(value = "zipCd", alternate = {"ZipCd"})
    private String ZipCd;

    public String getAddress1() {
        return Address1;
    }

    public void setAddress1(String address1) {
        Address1 = address1;
    }

    public String getAddress2() {
        return Address2;
    }

    public void setAddress2(String address2) {
        Address2 = address2;
    }

    public String getCity() {
        return City;
    }

    public void setCity(String city) {
        City = city;
    }

    public String getState() {
        return State;
    }

    public void setState(String state) {
        State = state;
    }

    public String getZipCd() {
        return ZipCd;
    }

    public void setZipCd(String zipCd) {
        ZipCd = zipCd;
    }
}
