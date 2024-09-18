package com.wh_certificate.sdk.model;

import java.util.List;

public class RequestByEmailResponse {

    private List<Error> Errors;
    private Requester Requester;
    private String SubmissionId;
    private WhCertificate WhCertificate;

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

    public Requester getRequester() {
        return Requester;
    }

    public void setRequester(Requester requester) {
        Requester = requester;
    }

    public String getSubmissionId() {
        return SubmissionId;
    }

    public void setSubmissionId(String submissionId) {
        SubmissionId = submissionId;
    }

    public WhCertificate getWhCertificate() {
        return WhCertificate;
    }

    public void setWhCertificate(WhCertificate whCertificate) {
        WhCertificate = whCertificate;
    }
}
