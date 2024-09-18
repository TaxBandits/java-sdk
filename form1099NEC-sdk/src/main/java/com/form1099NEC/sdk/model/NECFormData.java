package com.form1099NEC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class NECFormData {

    @JsonProperty("AccountNum")
    private String AccountNum;
    @JsonProperty("B1NEC")
    private String B1NEC;
    @JsonProperty("B2IsDirectSales")
    private Boolean B2IsDirectSales;
    @JsonProperty("B4FedTaxWH")
    private String B4FedTaxWH;
    @JsonProperty("Is2ndTINnot")
    private Boolean Is2ndTINnot;
    @JsonProperty("IsFATCA")
    private Boolean IsFATCA;
    @JsonProperty("States")
    private List<State> States;

    public String getAccountNum() {
        return AccountNum;
    }

    public void setAccountNum(String accountNum) {
        AccountNum = accountNum;
    }

    public String getB1NEC() {
        return B1NEC;
    }

    public void setB1NEC(String b1NEC) {
        B1NEC = b1NEC;
    }

    public Boolean getB2IsDirectSales() {
        return B2IsDirectSales;
    }

    public void setB2IsDirectSales(Boolean b2IsDirectSales) {
        B2IsDirectSales = b2IsDirectSales;
    }

    public String getB4FedTaxWH() {
        return B4FedTaxWH;
    }

    public void setB4FedTaxWH(String b4FedTaxWH) {
        B4FedTaxWH = b4FedTaxWH;
    }

    public Boolean getIs2ndTINnot() {
        return Is2ndTINnot;
    }

    public void setIs2ndTINnot(Boolean is2ndTINnot) {
        Is2ndTINnot = is2ndTINnot;
    }

    public Boolean getFATCA() {
        return IsFATCA;
    }

    public void setFATCA(Boolean FATCA) {
        IsFATCA = FATCA;
    }

    public List<State> getStates() {
        return States;
    }

    public void setStates(List<State> states) {
        States = states;
    }
}
