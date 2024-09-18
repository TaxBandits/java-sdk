package com.formW9.sdk.model;

import java.util.List;

public class RequestByEmailResponse {

    private List<Error> Errors;
    private Requester Requester;
    private String SubmissionId;

    private FormW9RecordByEmail FormW9Records;

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

    public com.formW9.sdk.model.Requester getRequester() {
        return Requester;
    }

    public void setRequester(com.formW9.sdk.model.Requester requester) {
        Requester = requester;
    }

    public String getSubmissionId() {
        return SubmissionId;
    }

    public void setSubmissionId(String submissionId) {
        SubmissionId = submissionId;
    }

    public FormW9RecordByEmail getFormW9Records() {
        return FormW9Records;
    }

    public void setFormW9Records(FormW9RecordByEmail formW9Records) {
        FormW9Records = formW9Records;
    }
}
