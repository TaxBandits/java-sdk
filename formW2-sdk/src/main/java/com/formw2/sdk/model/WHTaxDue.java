package com.formw2.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WHTaxDue {

    @JsonProperty("TotalForYear")
    private Long TotalForYear;
    @JsonProperty("WVTaxQ1")
    private Long WVTaxQ1;
    @JsonProperty("WVTaxQ2")
    private Long WVTaxQ2;
    @JsonProperty("WVTaxQ3")
    private Long WVTaxQ3;
    @JsonProperty("WVTaxQ4")
    private Long WVTaxQ4;

    public Long getTotalForYear() {
        return TotalForYear;
    }

    public void setTotalForYear(Long totalForYear) {
        TotalForYear = totalForYear;
    }

    public Long getWVTaxQ1() {
        return WVTaxQ1;
    }

    public void setWVTaxQ1(Long WVTaxQ1) {
        this.WVTaxQ1 = WVTaxQ1;
    }

    public Long getWVTaxQ2() {
        return WVTaxQ2;
    }

    public void setWVTaxQ2(Long WVTaxQ2) {
        this.WVTaxQ2 = WVTaxQ2;
    }

    public Long getWVTaxQ3() {
        return WVTaxQ3;
    }

    public void setWVTaxQ3(Long WVTaxQ3) {
        this.WVTaxQ3 = WVTaxQ3;
    }

    public Long getWVTaxQ4() {
        return WVTaxQ4;
    }

    public void setWVTaxQ4(Long WVTaxQ4) {
        this.WVTaxQ4 = WVTaxQ4;
    }
}
