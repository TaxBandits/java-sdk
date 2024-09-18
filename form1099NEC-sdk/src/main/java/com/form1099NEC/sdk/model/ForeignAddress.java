package com.form1099NEC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ForeignAddress {

    @JsonProperty("Address1")
    private String Address1;
    @JsonProperty("Address2")
    private String Address2;
    @JsonProperty("City")
    private String City;
    @JsonProperty("Country")
    private String Country;
    @JsonProperty("PostalCd")
    private String PostalCd;
    @JsonProperty("ProvinceOrStateNm")
    private String ProvinceOrStateNm;

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

    public String getCountry() {
        return Country;
    }

    public void setCountry(String country) {
        Country = country;
    }

    public String getPostalCd() {
        return PostalCd;
    }

    public void setPostalCd(String postalCd) {
        PostalCd = postalCd;
    }

    public String getProvinceOrStateNm() {
        return ProvinceOrStateNm;
    }

    public void setProvinceOrStateNm(String provinceOrStateNm) {
        ProvinceOrStateNm = provinceOrStateNm;
    }
}
