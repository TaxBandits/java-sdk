package com.boir.sdk.model.boir.get.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CompanyApplicantsItem {
    @JsonProperty("FirstNm")
    private String FirstNm;

    @JsonProperty("Suffix")
    private String Suffix;

    @JsonProperty("Address")
    private Address Address;

    @JsonProperty("MiddleNm")
    private String MiddleNm;

    @JsonProperty("DOB")
    private String DOB;

    @JsonProperty("FormOfIdentification")
    private FormOfIdentification FormOfIdentification;

    @JsonProperty("CompanyApplicantId")
    private String CompanyApplicantId;

    @JsonProperty("LastNm")
    private String LastNm;

    @JsonProperty("FinCENID")
    private String FinCENID;

    @JsonProperty("AddressType")
    private String AddressType;

    @JsonProperty("SequenceId")
    private String SequenceId;

    public String getFirstNm() {
        return FirstNm;
    }

    public void setFirstNm(String firstNm) {
        FirstNm = firstNm;
    }

    public String getSuffix() {
        return Suffix;
    }

    public void setSuffix(String suffix) {
        Suffix = suffix;
    }

    public Address getAddress() {
        return Address;
    }

    public void setAddress(Address address) {
        Address = address;
    }

    public String getMiddleNm() {
        return MiddleNm;
    }

    public void setMiddleNm(String middleNm) {
        MiddleNm = middleNm;
    }

    public String getDOB() {
        return DOB;
    }

    public void setDOB(String DOB) {
        this.DOB = DOB;
    }

    public FormOfIdentification getFormOfIdentification() {
        return FormOfIdentification;
    }

    public void setFormOfIdentification(FormOfIdentification formOfIdentification) {
        FormOfIdentification = formOfIdentification;
    }

    public String getCompanyApplicantId() {
        return CompanyApplicantId;
    }

    public void setCompanyApplicantId(String companyApplicantId) {
        CompanyApplicantId = companyApplicantId;
    }

    public String getLastNm() {
        return LastNm;
    }

    public void setLastNm(String lastNm) {
        LastNm = lastNm;
    }

    public String getFinCENID() {
        return FinCENID;
    }

    public void setFinCENID(String finCENID) {
        FinCENID = finCENID;
    }

    public String getAddressType() {
        return AddressType;
    }

    public void setAddressType(String addressType) {
        AddressType = addressType;
    }

    public String getSequenceId() {
        return SequenceId;
    }

    public void setSequenceId(String sequenceId) {
        SequenceId = sequenceId;
    }
}
