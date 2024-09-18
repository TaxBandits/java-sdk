package com.boir.sdk.model.boir.create.response;

import com.boir.sdk.model.Error;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class CompanyApplicantsItem {
    @JsonProperty("Errors")
    private List<Error> Errors = null;
    @JsonProperty("SequenceId")
    private String SequenceId;
    @JsonProperty("CompanyApplicantId")
    private String CompanyApplicantId;
    @JsonProperty("Status")
    private String Status;

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

    public String getSequenceId() {
        return SequenceId;
    }

    public void setSequenceId(String sequenceId) {
        SequenceId = sequenceId;
    }

    public String getCompanyApplicantId() {
        return CompanyApplicantId;
    }

    public void setCompanyApplicantId(String companyApplicantId) {
        CompanyApplicantId = companyApplicantId;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }
}