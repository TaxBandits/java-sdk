package com.boir.sdk.model.boir.create.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ReturnData {
    @JsonProperty("SubmitterInformation")
    private SubmitterInformation SubmitterInformation;
    @JsonProperty("BeneficialOwners")
    private List<BeneficialOwnersItem> BeneficialOwners;
    @JsonProperty("CompanyApplicants")
    private List<CompanyApplicantsItem> CompanyApplicants;

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

    public List<CompanyApplicantsItem> getCompanyApplicants() {
        return CompanyApplicants;
    }

    public void setCompanyApplicants(List<CompanyApplicantsItem> companyApplicants) {
        CompanyApplicants = companyApplicants;
    }
}