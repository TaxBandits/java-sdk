package com.oauth.sdk.model;

public class CreateBusinessRequest {

    private String jwtToken;
    private String BusinessId;
    private String BusinessNm;
    private String BusinessType;
    private String ContactNm;
    private String EINorSSN;
    private String Email;
    private String Fax;
    private Object ForeignAddress;
    private Boolean IsBusinessTerminated;
    private Boolean IsEIN;
    private Boolean IsForeign;
    private String KindOfEmployer;
    private String KindOfPayer;
    private String Phone;
    private String PhoneExtn;
    private SigningAuthority SigningAuthority;
    private String TradeNm;
    private USAddress USAddress;

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

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

    public Object getForeignAddress() {
        return ForeignAddress;
    }

    public void setForeignAddress(Object foreignAddress) {
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

    public com.oauth.sdk.model.SigningAuthority getSigningAuthority() {
        return SigningAuthority;
    }

    public void setSigningAuthority(com.oauth.sdk.model.SigningAuthority signingAuthority) {
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
