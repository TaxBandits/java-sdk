package com.oauth.sdk.model;

public class USAddress {

    private String Address1;
    private String City;
    private String State;
    private String ZipCd;

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
