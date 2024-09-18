package com.form1099MISC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class USAddress {

    @JsonProperty("Address1")
    private String Address1;
    @JsonProperty("Address2")
    private String Address2;
    @JsonProperty("City")
    private String City;
    @JsonProperty("State")
    private String State;
    @JsonProperty("ZipCd")
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
