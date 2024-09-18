package com.boir.sdk.model.boir.create.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ReturnHeader {
    @JsonProperty("ReportingCompany")
    private ReportingCompany ReportingCompany;
    @JsonProperty("PrevReportDetails")
    private PrevReportDetails PrevReportDetails;
    @JsonProperty("IsRequestFinCENId")
    private boolean IsRequestFinCENId;
    @JsonProperty("ReportType")
    private String ReportType;

    public ReportingCompany getReportingCompany() {
        return ReportingCompany;
    }

    public void setReportingCompany(ReportingCompany reportingCompany) {
        ReportingCompany = reportingCompany;
    }

    public PrevReportDetails getPrevReportDetails() {
        return PrevReportDetails;
    }

    public void setPrevReportDetails(PrevReportDetails prevReportDetails) {
        PrevReportDetails = prevReportDetails;
    }

    public boolean isRequestFinCENId() {
        return IsRequestFinCENId;
    }

    public void setRequestFinCENId(boolean requestFinCENId) {
        IsRequestFinCENId = requestFinCENId;
    }

    public String getReportType() {
        return ReportType;
    }

    public void setReportType(String reportType) {
        ReportType = reportType;
    }
}
