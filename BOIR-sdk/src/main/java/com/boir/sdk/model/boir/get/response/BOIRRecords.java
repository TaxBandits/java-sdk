package com.boir.sdk.model.boir.get.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class BOIRRecords {
    @JsonProperty("ReportingCompany")
    private ReportingCompany ReportingCompany;

    @JsonProperty("SubmitterInformation")
    private SubmitterInformation SubmitterInformation;

    @JsonProperty("BeneficialOwners")
    private List<BeneficialOwnersItem> BeneficialOwners;

    @JsonProperty("IsRequestFinCENId")
    private Boolean IsRequestFinCENId;

    @JsonProperty("SubmissionId")
    private String SubmissionId;

    @JsonProperty("CompanyApplicants")
    private List<CompanyApplicantsItem> CompanyApplicants;

    @JsonProperty("ReportStatus")
    private String ReportStatus;

    @JsonProperty("ReportType")
    private String ReportType;

    public ReportingCompany getReportingCompany() {
        return ReportingCompany;
    }

    public void setReportingCompany(ReportingCompany reportingCompany) {
        ReportingCompany = reportingCompany;
    }

    public SubmitterInformation getSubmitterInformation() {
        return SubmitterInformation;
    }

    public void setSubmitterInformation(SubmitterInformation submitterInformation) {
        SubmitterInformation = submitterInformation;
    }

    public List<BeneficialOwnersItem> getBeneficialOwners() {
        return BeneficialOwners;
    }

    public void setBeneficialOwners(List<BeneficialOwnersItem> beneficialOwners) {
        BeneficialOwners = beneficialOwners;
    }

    public Boolean getRequestFinCENId() {
        return IsRequestFinCENId;
    }

    public void setRequestFinCENId(Boolean requestFinCENId) {
        IsRequestFinCENId = requestFinCENId;
    }

    public String getSubmissionId() {
        return SubmissionId;
    }

    public void setSubmissionId(String submissionId) {
        SubmissionId = submissionId;
    }

    public List<CompanyApplicantsItem> getCompanyApplicants() {
        return CompanyApplicants;
    }

    public void setCompanyApplicants(List<CompanyApplicantsItem> companyApplicants) {
        CompanyApplicants = companyApplicants;
    }

    public String getReportStatus() {
        return ReportStatus;
    }

    public void setReportStatus(String reportStatus) {
        ReportStatus = reportStatus;
    }

    public String getReportType() {
        return ReportType;
    }

    public void setReportType(String reportType) {
        ReportType = reportType;
    }
}