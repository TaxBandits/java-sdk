package com.form1099NEC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FundingSource {

    @JsonProperty("Address")
    public String Address;

    @JsonProperty("City")
    public String City;

    @JsonProperty("State")
    public String State;

    @JsonProperty("Zip")
    public String Zip;

    @JsonProperty("ZipExtn")
    public String ZipExtn;

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
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

    public String getZip() {
        return Zip;
    }

    public void setZip(String zip) {
        Zip = zip;
    }

    public String getZipExtn() {
        return ZipExtn;
    }

    public void setZipExtn(String zipExtn) {
        ZipExtn = zipExtn;
    }
}
