package com.formW9.sdk.model;

import java.util.List;

public class RequestByUrlResponse {

    private List<Error> Errors;
    private String PayeeRef;
    private String SubmissionId;
    private String W9Url;

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

    public String getW9Url() {
        return W9Url;
    }

    public void setW9Url(String w9Url) {
        W9Url = w9Url;
    }
}
