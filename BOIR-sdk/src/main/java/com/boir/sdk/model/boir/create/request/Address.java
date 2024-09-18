package com.boir.sdk.model.boir.create.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Address {
    @JsonProperty("StreetAddress")
    private String StreetAddress;
    @JsonProperty("State")
    private String State;
    @JsonProperty("ZipCd")
    private String ZipCd;
    @JsonProperty("Country")
    private String Country;
    @JsonProperty("City")
    private String City;

    public void setStreetAddress(String streetAddress) {
        this.StreetAddress = streetAddress;
    }

    public String getStreetAddress() {
        return StreetAddress;
    }

    public void setState(String state) {
        this.State = state;
    }

    public String getState() {
        return State;
    }

    public void setZipCd(String zipCd) {
        this.ZipCd = zipCd;
    }

    public String getZipCd() {
        return ZipCd;
    }

    public void setCountry(String country) {
        this.Country = country;
    }

    public String getCountry() {
        return Country;
    }

    public void setCity(String city) {
        this.City = city;
    }

    public String getCity() {
        return City;
    }
}
