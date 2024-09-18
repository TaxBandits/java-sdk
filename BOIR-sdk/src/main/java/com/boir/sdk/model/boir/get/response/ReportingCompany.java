package com.boir.sdk.model.boir.get.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ReportingCompany {

    @JsonProperty("FirstNm")
    private String FirstNm;

    @JsonProperty("TaxIDCountry")
    private String TaxIDCountry;

    @JsonProperty("FormationInformation")
    private FormationInformation FormationInformation;

    @JsonProperty("Suffix")
    private String Suffix;

    @JsonProperty("TINType")
    private String TINType;

    @JsonProperty("LegalNm")
    private String LegalNm;

    @JsonProperty("MiddleNm")
    private String MiddleNm;

    @JsonProperty("LastNm")
    private String LastNm;

    @JsonProperty("TIN")
    private String TIN;

    @JsonProperty("USAddress")
    private USAddress USAddress;

    @JsonProperty("DBAs")
    private List<String> DBAs;

    public String getFirstNm() {
        return FirstNm;
    }

    public void setFirstNm(String firstNm) {
        FirstNm = firstNm;
    }

    public String getTaxIDCountry() {
        return TaxIDCountry;
    }

    public void setTaxIDCountry(String taxIDCountry) {
        TaxIDCountry = taxIDCountry;
    }

    public FormationInformation getFormationInformation() {
        return FormationInformation;
    }

    public void setFormationInformation(FormationInformation formationInformation) {
        FormationInformation = formationInformation;
    }

    public String getSuffix() {
        return Suffix;
    }

    public void setSuffix(String suffix) {
        Suffix = suffix;
    }

    public String getTINType() {
        return TINType;
    }

    public void setTINType(String TINType) {
        this.TINType = TINType;
    }

    public String getLegalNm() {
        return LegalNm;
    }

    public void setLegalNm(String legalNm) {
        LegalNm = legalNm;
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

    public String getTIN() {
        return TIN;
    }

    public void setTIN(String TIN) {
        this.TIN = TIN;
    }

    public USAddress getUSAddress() {
        return USAddress;
    }

    public void setUSAddress(USAddress USAddress) {
        this.USAddress = USAddress;
    }

    public List<String> getDBAs() {
        return DBAs;
    }

    public void setDBAs(List<String> DBAs) {
        this.DBAs = DBAs;
    }
}