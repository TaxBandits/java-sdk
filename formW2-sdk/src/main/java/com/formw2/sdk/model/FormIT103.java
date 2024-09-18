package com.formw2.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FormIT103 {

    @JsonProperty("NumOf1099W2")
    private Long NumOf1099W2;
    @JsonProperty("TotalTaxWH1099W2")
    private Double TotalTaxWH1099W2;
    @JsonProperty("WHTaxDue")
    private WHTaxDue WHTaxDue;
    @JsonProperty("WVWithHoldingID")
    private String WVWithHoldingID;

    public Long getNumOf1099W2() {
        return NumOf1099W2;
    }

    public void setNumOf1099W2(Long numOf1099W2) {
        NumOf1099W2 = numOf1099W2;
    }

    public Double getTotalTaxWH1099W2() {
        return TotalTaxWH1099W2;
    }

    public void setTotalTaxWH1099W2(Double totalTaxWH1099W2) {
        TotalTaxWH1099W2 = totalTaxWH1099W2;
    }

    public WHTaxDue getWHTaxDue() {
        return WHTaxDue;
    }

    public void setWHTaxDue(WHTaxDue WHTaxDue) {
        this.WHTaxDue = WHTaxDue;
    }

    public String getWVWithHoldingID() {
        return WVWithHoldingID;
    }

    public void setWVWithHoldingID(String WVWithHoldingID) {
        this.WVWithHoldingID = WVWithHoldingID;
    }
}
