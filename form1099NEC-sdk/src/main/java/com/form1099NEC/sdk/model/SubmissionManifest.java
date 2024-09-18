package com.form1099NEC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SubmissionManifest {

    @JsonProperty("IsFederalFiling")
    private boolean IsFederalFiling;
    @JsonProperty("IsOnlineAccess")
    private boolean IsOnlineAccess;
    @JsonProperty("IsPostal")
    private boolean IsPostal;
    @JsonProperty("IsStateFiling")
    private boolean IsStateFiling;
    @JsonProperty("SubmissionId")
    private String SubmissionId;
    @JsonProperty("TaxYear")
    private String TaxYear;

    public boolean isFederalFiling() {
        return IsFederalFiling;
    }

    public void setFederalFiling(boolean federalFiling) {
        IsFederalFiling = federalFiling;
    }

    public boolean isOnlineAccess() {
        return IsOnlineAccess;
    }

    public void setOnlineAccess(boolean onlineAccess) {
        IsOnlineAccess = onlineAccess;
    }

    public boolean isPostal() {
        return IsPostal;
    }

    public void setPostal(boolean postal) {
        IsPostal = postal;
    }

    public String getSubmissionId() {
        return SubmissionId;
    }

    public void setSubmissionId(String submissionId) {
        SubmissionId = submissionId;
    }

    public String getTaxYear() {
        return TaxYear;
    }

    public void setTaxYear(String taxYear) {
        TaxYear = taxYear;
    }

    public boolean getStateFiling() {
        return IsStateFiling;
    }

    public void setStateFiling(boolean stateFiling) {
        IsStateFiling = stateFiling;
    }
}
