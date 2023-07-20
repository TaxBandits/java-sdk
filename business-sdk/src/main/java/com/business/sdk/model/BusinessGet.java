package com.business.sdk.model;

import com.google.gson.annotations.SerializedName;

public class BusinessGet {

    @SerializedName(value = "businessId", alternate = {"BusinessId"})
    private String BusinessId;
    @SerializedName(value = "businessNm", alternate = {"BusinessNm"})
    private String BusinessNm;
    @SerializedName(value = "businessType", alternate = {"BusinessType"})
    private String BusinessType;
    @SerializedName(value = "contactNm", alternate = {"ContactNm"})
    private String ContactNm;
    @SerializedName(value = "einorSSN", alternate = {"EINorSSN"})
    private String EINorSSN;
    @SerializedName(value = "email", alternate = {"Email"})
    private String Email;
    @SerializedName(value = "fax", alternate = {"Fax"})
    private String Fax;
    @SerializedName(value = "foreignAddress", alternate = {"ForeignAddress"})
    private ForeignAddress ForeignAddress;
    @SerializedName(value = "businessTerminated", alternate = {"IsBusinessTerminated"})
    private Boolean IsBusinessTerminated;
    @SerializedName(value = "ein", alternate = {"IsEIN"})
    private Boolean IsEIN;
    @SerializedName(value = "foreign", alternate = {"IsForeign"})
    private Boolean IsForeign;
    @SerializedName(value = "kindOfEmployer", alternate = {"KindOfEmployer"})
    private String KindOfEmployer;
    @SerializedName(value = "kindOfPayer", alternate = {"KindOfPayer"})
    private String KindOfPayer;
    @SerializedName(value = "payerRef", alternate = {"PayerRef"})
    private String PayerRef;
    @SerializedName(value = "phone", alternate = {"Phone"})
    private String Phone;
    @SerializedName(value = "phoneExtn", alternate = {"PhoneExtn"})
    private String PhoneExtn;
    @SerializedName(value = "signingAuthority", alternate = {"SigningAuthority"})
    private SigningAuthority SigningAuthority;
    @SerializedName(value = "tradeNm", alternate = {"TradeNm"})
    private String TradeNm;
    @SerializedName(value = "usaddress", alternate = {"USAddress"})
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

    public com.business.sdk.model.ForeignAddress getForeignAddress() {
        return ForeignAddress;
    }

    public void setForeignAddress(com.business.sdk.model.ForeignAddress foreignAddress) {
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

    public com.business.sdk.model.SigningAuthority getSigningAuthority() {
        return SigningAuthority;
    }

    public void setSigningAuthority(com.business.sdk.model.SigningAuthority signingAuthority) {
        SigningAuthority = signingAuthority;
    }

    public String getTradeNm() {
        return TradeNm;
    }

    public void setTradeNm(String TradeNm) {
        this.TradeNm = TradeNm;
    }

    public com.business.sdk.model.USAddress getUSAddress() {
        return USAddress;
    }

    public void setUSAddress(com.business.sdk.model.USAddress USAddress) {
        this.USAddress = USAddress;
    }
}
