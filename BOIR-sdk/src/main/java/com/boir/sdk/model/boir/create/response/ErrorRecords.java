package com.boir.sdk.model.boir.create.response;

import com.boir.sdk.model.Error;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ErrorRecords {
    @JsonProperty("SubmitterInformation")
    private List<Error> SubmitterInformation = null;
    @JsonProperty("BeneficialOwners")
    private List<BeneficialOwnersItem> BeneficialOwners = null;
    @JsonProperty("CompanyApplicants")
    private List<CompanyApplicantsItem> CompanyApplicants = null;

    public List<Error> getSubmitterInformation() {
        return SubmitterInformation;
    }

    public void setSubmitterInformation(List<Error> submitterInformation) {
        SubmitterInformation = submitterInformation;
    }

    public List<BeneficialOwnersItem> getBeneficialOwners() {
        return BeneficialOwners;
    }

    public void setBeneficialOwners(List<BeneficialOwnersItem> beneficialOwners) {
        BeneficialOwners = beneficialOwners;
    }

    public List<CompanyApplicantsItem> getCompanyApplicants() {
        return CompanyApplicants;
    }

    public void setCompanyApplicants(List<CompanyApplicantsItem> companyApplicants) {
        CompanyApplicants = companyApplicants;
    }
}