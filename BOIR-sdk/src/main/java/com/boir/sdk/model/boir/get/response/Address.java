package com.boir.sdk.model.boir.get.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Address {
    @JsonProperty("State")
    private String State;

    @JsonProperty("ZipCd")
    private String ZipCd;

    @JsonProperty("Country")
    private String Country;

    @JsonProperty("Address1")
    private String Address1;

    @JsonProperty("City")
    private String City;

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

    public String getCountry() {
        return Country;
    }

    public void setCountry(String country) {
        Country = country;
    }

    public String getAddress1() {
        return Address1;
    }

    public void setAddress1(String address1) {
        Address1 = address1;
    }

    public String getCity() {
        return City;
    }

    public void setCity(String city) {
        City = city;
    }
}
