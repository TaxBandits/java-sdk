package com.boir.sdk.model.boir.get.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class USAddress {

    @JsonProperty("StreetAddress")
    private String StreetAddress;

    @JsonProperty("State")
    private String State;

    @JsonProperty("ZipCd")
    private String ZipCd;

    @JsonProperty("City")
    private String City;

    public String getStreetAddress() {
        return StreetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        StreetAddress = streetAddress;
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

    public String getCity() {
        return City;
    }

    public void setCity(String city) {
        City = city;
    }
}
