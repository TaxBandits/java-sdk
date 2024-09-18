package com.wh_certificate.sdk.model;

import java.util.List;

public class RequestByUrlResponse {

    private List<Error> Errors;
    private String PayeeRef;
    private String SubmissionId;
    private String Url;

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

    public String getPayeeRef() {
        return PayeeRef;
    }

    public void setPayeeRef(String payeeRef) {
        PayeeRef = payeeRef;
    }

    public String getSubmissionId() {
        return SubmissionId;
    }

    public void setSubmissionId(String submissionId) {
        SubmissionId = submissionId;
    }

    public String getUrl() {
        return Url;
    }

    public void setUrl(String url) {
        Url = url;
    }
}
