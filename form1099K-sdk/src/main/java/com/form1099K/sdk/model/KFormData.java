package com.form1099K.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class KFormData {

    @JsonProperty("AccountNum")
    private String AccountNum;
    @JsonProperty("B1aGrossAmt")
    private Double B1aGrossAmt;
    @JsonProperty("B1bCardNotPresentTxns")
    private Double B1bCardNotPresentTxns;
    @JsonProperty("B2MerchantCd")
    private String B2MerchantCd;
    @JsonProperty("B3NumPymtTxns")
    private Long B3NumPymtTxns;
    @JsonProperty("B4FedTaxWH")
    private Long B4FedTaxWH;
    @JsonProperty("B5aJan")
    private Long B5aJan;
    @JsonProperty("B5bFeb")
    private Long B5bFeb;
    @JsonProperty("B5cMar")
    private Double B5cMar;
    @JsonProperty("B5dApr")
    private Long B5dApr;
    @JsonProperty("B5eMay")
    private Long B5eMay;
    @JsonProperty("B5fJun")
    private Double B5fJun;
    @JsonProperty("B5gJul")
    private Long B5gJul;
    @JsonProperty("B5hAug")
    private Double B5hAug;
    @JsonProperty("B5iSep")
    private Long B5iSep;
    @JsonProperty("B5jOct")
    private Double B5jOct;
    @JsonProperty("B5kNov")
    private Long B5kNov;
    @JsonProperty("B5lDec")
    private Long B5lDec;
    @JsonProperty("FilerIndicator")
    private String FilerIndicator;
    @JsonProperty("IndicateTxnsReported")
    private String IndicateTxnsReported;
    @JsonProperty("Is2ndTINnot")
    private Boolean Is2ndTINnot;
    @JsonProperty("PSEDetails")
    private PSEDetails PSEDetails;
    @JsonProperty("States")
    private List<State> States;

    public String getAccountNum() {
        return AccountNum;
    }

    public void setAccountNum(String accountNum) {
        AccountNum = accountNum;
    }

    public Double getB1aGrossAmt() {
        return B1aGrossAmt;
    }

    public void setB1aGrossAmt(Double b1aGrossAmt) {
        B1aGrossAmt = b1aGrossAmt;
    }

    public Double getB1bCardNotPresentTxns() {
        return B1bCardNotPresentTxns;
    }

    public void setB1bCardNotPresentTxns(Double b1bCardNotPresentTxns) {
        B1bCardNotPresentTxns = b1bCardNotPresentTxns;
    }

    public String getB2MerchantCd() {
        return B2MerchantCd;
    }

    public void setB2MerchantCd(String b2MerchantCd) {
        B2MerchantCd = b2MerchantCd;
    }

    public Long getB3NumPymtTxns() {
        return B3NumPymtTxns;
    }

    public void setB3NumPymtTxns(Long b3NumPymtTxns) {
        B3NumPymtTxns = b3NumPymtTxns;
    }

    public Long getB4FedTaxWH() {
        return B4FedTaxWH;
    }

    public void setB4FedTaxWH(Long b4FedTaxWH) {
        B4FedTaxWH = b4FedTaxWH;
    }

    public Long getB5aJan() {
        return B5aJan;
    }

    public void setB5aJan(Long b5aJan) {
        B5aJan = b5aJan;
    }

    public Long getB5bFeb() {
        return B5bFeb;
    }

    public void setB5bFeb(Long b5bFeb) {
        B5bFeb = b5bFeb;
    }

    public Double getB5cMar() {
        return B5cMar;
    }

    public void setB5cMar(Double b5cMar) {
        B5cMar = b5cMar;
    }

    public Long getB5dApr() {
        return B5dApr;
    }

    public void setB5dApr(Long b5dApr) {
        B5dApr = b5dApr;
    }

    public Long getB5eMay() {
        return B5eMay;
    }

    public void setB5eMay(Long b5eMay) {
        B5eMay = b5eMay;
    }

    public Double getB5fJun() {
        return B5fJun;
    }

    public void setB5fJun(Double b5fJun) {
        B5fJun = b5fJun;
    }

    public Long getB5gJul() {
        return B5gJul;
    }

    public void setB5gJul(Long b5gJul) {
        B5gJul = b5gJul;
    }

    public Double getB5hAug() {
        return B5hAug;
    }

    public void setB5hAug(Double b5hAug) {
        B5hAug = b5hAug;
    }

    public Long getB5iSep() {
        return B5iSep;
    }

    public void setB5iSep(Long b5iSep) {
        B5iSep = b5iSep;
    }

    public Double getB5jOct() {
        return B5jOct;
    }

    public void setB5jOct(Double b5jOct) {
        B5jOct = b5jOct;
    }

    public Long getB5kNov() {
        return B5kNov;
    }

    public void setB5kNov(Long b5kNov) {
        B5kNov = b5kNov;
    }

    public Long getB5lDec() {
        return B5lDec;
    }

    public void setB5lDec(Long b5lDec) {
        B5lDec = b5lDec;
    }

    public String getFilerIndicator() {
        return FilerIndicator;
    }

    public void setFilerIndicator(String filerIndicator) {
        FilerIndicator = filerIndicator;
    }

    public String getIndicateTxnsReported() {
        return IndicateTxnsReported;
    }

    public void setIndicateTxnsReported(String indicateTxnsReported) {
        IndicateTxnsReported = indicateTxnsReported;
    }

    public Boolean getIs2ndTINnot() {
        return Is2ndTINnot;
    }

    public void setIs2ndTINnot(Boolean is2ndTINnot) {
        Is2ndTINnot = is2ndTINnot;
    }

    public com.form1099K.sdk.model.PSEDetails getPSEDetails() {
        return PSEDetails;
    }

    public void setPSEDetails(com.form1099K.sdk.model.PSEDetails PSEDetails) {
        this.PSEDetails = PSEDetails;
    }

    public List<State> getStates() {
        return States;
    }

    public void setStates(List<State> states) {
        States = states;
    }
}
