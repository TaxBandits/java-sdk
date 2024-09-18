package com.formW9.sdk.model;

public class Status {

    private String FormStatus;
    private String FormType;
    private String StatusTs;
    private String SubmissionId;
    private TINMatching TINMatching;

    public String getFormStatus() {
        return FormStatus;
    }

    public void setFormStatus(String formStatus) {
        FormStatus = formStatus;
    }

    public String getFormType() {
        return FormType;
    }

    public void setFormType(String formType) {
        FormType = formType;
    }

    public String getStatusTs() {
        return StatusTs;
    }

    public void setStatusTs(String statusTs) {
        StatusTs = statusTs;
    }

    public String getSubmissionId() {
        return SubmissionId;
    }

    public void setSubmissionId(String submissionId) {
        SubmissionId = submissionId;
    }

    public com.formW9.sdk.model.TINMatching getTINMatching() {
        return TINMatching;
    }

    public void setTINMatching(com.formW9.sdk.model.TINMatching TINMatching) {
        this.TINMatching = TINMatching;
    }
}
