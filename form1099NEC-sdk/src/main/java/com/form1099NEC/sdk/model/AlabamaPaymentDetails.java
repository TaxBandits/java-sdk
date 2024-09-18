package com.form1099NEC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AlabamaPaymentDetails {

    @JsonProperty("TotTaxRemitt")
    public Double TotTaxRemitt;

    @JsonProperty("TotTaxWH1099W2")
    public Double TotTaxWH1099W2;

    @JsonProperty("TotTaxDue")
    public Double TotTaxDue;

    @JsonProperty("TotOverpayment")
    public Double TotOverpayment;

    @JsonProperty("OverPaymentType")
    public String OverPaymentType;

    @JsonProperty("PaymentMethod")
    public String PaymentMethod;

    @JsonProperty("IsInternationalACHTxn")
    public Boolean IsInternationalACHTxn;

    public Double getTotTaxRemitt() {
        return TotTaxRemitt;
    }

    public void setTotTaxRemitt(Double totTaxRemitt) {
        TotTaxRemitt = totTaxRemitt;
    }

    public Double getTotTaxWH1099W2() {
        return TotTaxWH1099W2;
    }

    public void setTotTaxWH1099W2(Double totTaxWH1099W2) {
        TotTaxWH1099W2 = totTaxWH1099W2;
    }

    public Double getTotTaxDue() {
        return TotTaxDue;
    }

    public void setTotTaxDue(Double totTaxDue) {
        TotTaxDue = totTaxDue;
    }

    public Double getTotOverpayment() {
        return TotOverpayment;
    }

    public void setTotOverpayment(Double totOverpayment) {
        TotOverpayment = totOverpayment;
    }

    public String getOverPaymentType() {
        return OverPaymentType;
    }

    public void setOverPaymentType(String overPaymentType) {
        OverPaymentType = overPaymentType;
    }

    public String getPaymentMethod() {
        return PaymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        PaymentMethod = paymentMethod;
    }

    public Boolean getInternationalACHTxn() {
        return IsInternationalACHTxn;
    }

    public void setInternationalACHTxn(Boolean internationalACHTxn) {
        IsInternationalACHTxn = internationalACHTxn;
    }
}
