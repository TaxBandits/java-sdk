package com.form1099K.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RequestRecipient {

    @JsonProperty("Email")
    private String Email;
    @JsonProperty("Fax")
    private String Fax;
    @JsonProperty("FirstPayeeNm")
    private String FirstPayeeNm;
    @JsonProperty("FirstNm")
    private String FirstNm;
    @JsonProperty("MiddleNm")
    private String MiddleNm;
    @JsonProperty("LastNm")
    private String LastNm;
    @JsonProperty("Suffix")
    private String Suffix;
    @JsonProperty("ForeignAddress")
    private ForeignAddress ForeignAddress;
    @JsonProperty("IsForeign")
    private Boolean IsForeign;
    @JsonProperty("Phone")
    private String Phone;
    @JsonProperty("RecipientId")
    private String RecipientId;
    @JsonProperty("SecondPayeeNm")
    private String SecondPayeeNm;
    @JsonProperty("TIN")
    private String TIN;
    @JsonProperty("TINType")
    private String TINType;
    @JsonProperty("USAddress")
    private USAddress USAddress;

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

    public String getFirstPayeeNm() {
        return FirstPayeeNm;
    }

    public void setFirstPayeeNm(String firstPayeeNm) {
        FirstPayeeNm = firstPayeeNm;
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

    public ForeignAddress getForeignAddress() {
        return ForeignAddress;
    }

    public void setForeignAddress(ForeignAddress foreignAddress) {
        ForeignAddress = foreignAddress;
    }

    public Boolean getForeign() {
        return IsForeign;
    }

    public void setForeign(Boolean foreign) {
        IsForeign = foreign;
    }

    public String getPhone() {
        return Phone;
    }

    public void setPhone(String phone) {
        Phone = phone;
    }

    public String getRecipientId() {
        return RecipientId;
    }

    public void setRecipientId(String recipientId) {
        RecipientId = recipientId;
    }

    public String getSecondPayeeNm() {
        return SecondPayeeNm;
    }

    public void setSecondPayeeNm(String secondPayeeNm) {
        SecondPayeeNm = secondPayeeNm;
    }

    public String getTIN() {
        return TIN;
    }

    public void setTIN(String TIN) {
        this.TIN = TIN;
    }

    public String getTINType() {
        return TINType;
    }

    public void setTINType(String TINType) {
        this.TINType = TINType;
    }

    public USAddress getUSAddress() {
        return USAddress;
    }

    public void setUSAddress(USAddress USAddress) {
        this.USAddress = USAddress;
    }
}
