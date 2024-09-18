package com.boir.sdk.model.boir.create.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PrevReportDetails {
    @JsonProperty("TaxIDCountry")
    private String TaxIDCountry;
    @JsonProperty("TINType")
    private String TINType;
    @JsonProperty("LegalNm")
    private String LegalNm;
    @JsonProperty("SubmissionId")
    private String SubmissionId;
    @JsonProperty("TIN")
    private String TIN;

    public String getTaxIDCountry() {
        return TaxIDCountry;
    }

    public void setTaxIDCountry(String taxIDCountry) {
        TaxIDCountry = taxIDCountry;
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

    public String getSubmissionId() {
        return SubmissionId;
    }

    public void setSubmissionId(String submissionId) {
        SubmissionId = submissionId;
    }

    public String getTIN() {
        return TIN;
    }

    public void setTIN(String TIN) {
        this.TIN = TIN;
    }
}
