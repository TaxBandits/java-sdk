package com.boir.sdk.model.business;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CreateBusinessRequest {

    @JsonProperty("BusinessId")
    private String BusinessId;
    @JsonProperty("BusinessNm")
    private String BusinessNm;
    @JsonProperty("FirstNm")
    private String FirstNm;
    @JsonProperty("MiddleNm")
    private String MiddleNm;
    @JsonProperty("LastNm")
    private String LastNm;
    @JsonProperty("Suffix")
    private String Suffix;
    @JsonProperty("BusinessType")
    private String BusinessType;
    @JsonProperty("ContactNm")
    private String ContactNm;
    @JsonProperty("EINorSSN")
    private String EINorSSN;
    @JsonProperty("Email")
    private String Email;
    @JsonProperty("Fax")
    private String Fax;
    @JsonProperty("ForeignAddress")
    private com.boir.sdk.model.business.ForeignAddress ForeignAddress;
    @JsonProperty("IsBusinessTerminated")
    private Boolean IsBusinessTerminated;
    @JsonProperty("IsEIN")
    private Boolean IsEIN;
    @JsonProperty("IsForeign")
    private Boolean IsForeign;
    @JsonProperty("KindOfEmployer")
    private String KindOfEmployer;
    @JsonProperty("KindOfPayer")
    private String KindOfPayer;
    @JsonProperty("PayerRef")
    private String PayerRef;
    @JsonProperty("Phone")
    private String Phone;
    @JsonProperty("PhoneExtn")
    private String PhoneExtn;
    @JsonProperty("SigningAuthority")
    private SigningAuthority SigningAuthority;
    @JsonProperty("TradeNm")
    private String TradeNm;
    @JsonProperty("USAddress")
    private USAddress USAddress;

    public String getBusinessId() {
        return BusinessId;
    }

    public void setBusinessId(String businessId) {
        BusinessId = businessId;
    }

    public String getBusinessNm() {
        return BusinessNm;
    }

    public void setBusinessNm(String businessNm) {
        BusinessNm = businessNm;
    }

    public String getFirstNm() {
        return FirstNm;
    }

    public void setFirstNm(String firstNm) {
        FirstNm = firstNm;
    }

    public String getMiddleNm() {
        return MiddleNm;
    }

    public void setMiddleNm(String middleNm) {
        MiddleNm = middleNm;
    }

    public String getLastNm() {
        return LastNm;
    }

    public void setLastNm(String lastNm) {
        LastNm = lastNm;
    }

    public String getSuffix() {
        return Suffix;
    }

    public void setSuffix(String suffix) {
        Suffix = suffix;
    }

    public String getBusinessType() {
        return BusinessType;
    }

    public void setBusinessType(String businessType) {
        BusinessType = businessType;
    }

    public String getContactNm() {
        return ContactNm;
    }

    public void setContactNm(String contactNm) {
        ContactNm = contactNm;
    }

    public String getEINorSSN() {
        return EINorSSN;
    }

    public void setEINorSSN(String EINorSSN) {
        this.EINorSSN = EINorSSN;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getFax() {
        return Fax;
    }

    public void setFax(String fax) {
        Fax = fax;
    }

    public ForeignAddress getForeignAddress() {
        return ForeignAddress;
    }

    public void setForeignAddress(ForeignAddress foreignAddress) {
        ForeignAddress = foreignAddress;
    }

    public Boolean getBusinessTerminated() {
        return IsBusinessTerminated;
    }

    public void setBusinessTerminated(Boolean businessTerminated) {
        IsBusinessTerminated = businessTerminated;
    }

    public Boolean getEIN() {
        return IsEIN;
    }

    public void setEIN(Boolean EIN) {
        IsEIN = EIN;
    }

    public Boolean getForeign() {
        return IsForeign;
    }

    public void setForeign(Boolean foreign) {
        IsForeign = foreign;
    }

    public String getKindOfEmployer() {
        return KindOfEmployer;
    }

    public void setKindOfEmployer(String kindOfEmployer) {
        KindOfEmployer = kindOfEmployer;
    }

    public String getKindOfPayer() {
        return KindOfPayer;
    }

    public void setKindOfPayer(String kindOfPayer) {
        KindOfPayer = kindOfPayer;
    }

    public String getPayerRef() {
        return PayerRef;
    }

    public void setPayerRef(String payerRef) {
        PayerRef = payerRef;
    }

    public String getPhone() {
        return Phone;
    }

    public void setPhone(String phone) {
        Phone = phone;
    }

    public String getPhoneExtn() {
        return PhoneExtn;
    }

    public void setPhoneExtn(String phoneExtn) {
        PhoneExtn = phoneExtn;
    }

    public SigningAuthority getSigningAuthority() {
        return SigningAuthority;
    }

    public void setSigningAuthority(SigningAuthority signingAuthority) {
        SigningAuthority = signingAuthority;
    }

    public String getTradeNm() {
        return TradeNm;
    }

    public void setTradeNm(String tradeNm) {
        TradeNm = tradeNm;
    }

    public USAddress getUSAddress() {
        return USAddress;
    }

    public void setUSAddress(USAddress USAddress) {
        this.USAddress = USAddress;
    }
}
