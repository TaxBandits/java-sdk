package com.form1099NEC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ReconFormA3 {

    @JsonProperty("ALWithHoldingID")
    public String ALWithHoldingID;

    @JsonProperty("NumOf1099W2")
    public Long NumOf1099W2;

    @JsonProperty("IncomeTaxWHAndRemitt")
    public List<IncomTaxWithheldandRemitt> IncomeTaxWHAndRemitt;

    @JsonProperty("PaymentDetails")
    public AlabamaPaymentDetails PaymentDetails;

    @JsonProperty("EFTDebitInfo")
    public AlabamaEFTDebitInfo EFTDebitInfo;

    @JsonProperty("FundingSource")
    public FundingSource FundingSource;

    public String getALWithHoldingID() {
        return ALWithHoldingID;
    }

    public void setALWithHoldingID(String ALWithHoldingID) {
        this.ALWithHoldingID = ALWithHoldingID;
    }

    public Long getNumOf1099W2() {
        return NumOf1099W2;
    }

    public void setNumOf1099W2(Long numOf1099W2) {
        NumOf1099W2 = numOf1099W2;
    }

    public List<IncomTaxWithheldandRemitt> getIncomeTaxWHAndRemitt() {
        return IncomeTaxWHAndRemitt;
    }

    public void setIncomeTaxWHAndRemitt(List<IncomTaxWithheldandRemitt> incomeTaxWHAndRemitt) {
        IncomeTaxWHAndRemitt = incomeTaxWHAndRemitt;
    }

    public AlabamaPaymentDetails getPaymentDetails() {
        return PaymentDetails;
    }

    public void setPaymentDetails(AlabamaPaymentDetails paymentDetails) {
        PaymentDetails = paymentDetails;
    }

    public AlabamaEFTDebitInfo getEFTDebitInfo() {
        return EFTDebitInfo;
    }

    public void setEFTDebitInfo(AlabamaEFTDebitInfo EFTDebitInfo) {
        this.EFTDebitInfo = EFTDebitInfo;
    }

    public com.form1099NEC.sdk.model.FundingSource getFundingSource() {
        return FundingSource;
    }

    public void setFundingSource(com.form1099NEC.sdk.model.FundingSource fundingSource) {
        FundingSource = fundingSource;
    }
}
