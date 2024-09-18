package com.form1099MISC.sdk.model;

import java.util.List;

public class DeleteResponse {

    private List<Error> Errors;
    private Form1099Records Form1099Records;
    private Long StatusCode;
    private String StatusMessage;
    private String StatusName;
    private String SubmissionId;

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

    public com.form1099MISC.sdk.model.Form1099Records getForm1099Records() {
        return Form1099Records;
    }

    public void setForm1099Records(com.form1099MISC.sdk.model.Form1099Records form1099Records) {
        Form1099Records = form1099Records;
    }

    public Long getStatusCode() {
        return StatusCode;
    }

    public void setStatusCode(Long statusCode) {
        StatusCode = statusCode;
    }

    public String getStatusMessage() {
        return StatusMessage;
    }

    public void setStatusMessage(String statusMessage) {
        StatusMessage = statusMessage;
    }

    public String getStatusName() {
        return StatusName;
    }

    public void setStatusName(String statusName) {
        StatusName = statusName;
    }

    public String getSubmissionId() {
        return SubmissionId;
    }

    public void setSubmissionId(String submissionId) {
        SubmissionId = submissionId;
    }
}
