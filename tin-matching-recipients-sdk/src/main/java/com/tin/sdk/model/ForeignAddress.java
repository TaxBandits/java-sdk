package com.tin.sdk.model;

import com.google.gson.annotations.SerializedName;

public class ForeignAddress {

    @SerializedName(value = "address1", alternate = {"Address1"})
    private String Address1;
    @SerializedName(value = "address2", alternate = {"Address2"})
    private String Address2;
    @SerializedName(value = "city", alternate = {"City"})
    private String City;
    @SerializedName(value = "country", alternate = {"Country"})
    private String Country;
    @SerializedName(value = "postalCd", alternate = {"PostalCd"})
    private String PostalCd;
    @SerializedName(value = "provinceOrStateNm", alternate = {"ProvinceOrStateNm"})
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
