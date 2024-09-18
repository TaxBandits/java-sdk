package com.form1099NEC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class IncomTaxWithheldandRemitt {

    @JsonProperty("Month")
    public String Month;

    @JsonProperty("TaxWH")
    public Double TaxWH;

    @JsonProperty("TaxRemitt")
    public Double TaxRemitt;

    public String getMonth() {
        return Month;
    }

    public void setMonth(String month) {
        Month = month;
    }

    public Double getTaxWH() {
        return TaxWH;
    }

    public void setTaxWH(Double taxWH) {
        TaxWH = taxWH;
    }

    public Double getTaxRemitt() {
        return TaxRemitt;
    }

    public void setTaxRemitt(Double taxRemitt) {
        TaxRemitt = taxRemitt;
    }
}
