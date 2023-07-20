package com.tin.sdk.model;

import java.util.List;

public class TinResponse {

    private String BusinessId;
    private String SubmissionId;
    private TINMatchingRecord TINMatchingRecords;
    private List<Error> Errors;

    public String getBusinessId() {
        return BusinessId;
    }

    public void setBusinessId(String businessId) {
        BusinessId = businessId;
    }

    public String getSubmissionId() {
        return SubmissionId;
    }

    public void setSubmissionId(String submissionId) {
        SubmissionId = submissionId;
    }

    public TINMatchingRecord getTINMatchingRecords() {
        return TINMatchingRecords;
    }

    public void setTINMatchingRecords(TINMatchingRecord TINMatchingRecords) {
        this.TINMatchingRecords = TINMatchingRecords;
    }

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }
}
