package com.formw2.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AlabamaEFTDebitInfo {

    @JsonProperty("BankAccType")
    public String BankAccType;

    @JsonProperty("BankAccNum")
    public String BankAccNum;

    @JsonProperty("BankRoutingNum")
    public String BankRoutingNum;

    @JsonProperty("PaymentDate")
    public String PaymentDate;

    public String getBankAccType() {
        return BankAccType;
    }

    public void setBankAccType(String bankAccType) {
        BankAccType = bankAccType;
    }

    public String getBankAccNum() {
        return BankAccNum;
    }

    public void setBankAccNum(String bankAccNum) {
        BankAccNum = bankAccNum;
    }

    public String getBankRoutingNum() {
        return BankRoutingNum;
    }

    public void setBankRoutingNum(String bankRoutingNum) {
        BankRoutingNum = bankRoutingNum;
    }

    public String getPaymentDate() {
        return PaymentDate;
    }

    public void setPaymentDate(String paymentDate) {
        PaymentDate = paymentDate;
    }
}
