package com.form1099NEC.sdk.model;

import java.util.List;

public class RequestPdfURLsResponse {

    private List<Error> Errors;
    private Form1099NecRecords Form1099NecRecords;
    private String SubmissionId;

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

    public Form1099NecRecords getForm1099NecRecords() {
        return Form1099NecRecords;
    }

    public void setForm1099NecRecords(Form1099NecRecords form1099NecRecords) {
        Form1099NecRecords = form1099NecRecords;
    }

    public String getSubmissionId() {
        return SubmissionId;
    }

    public void setSubmissionId(String submissionId) {
        SubmissionId = submissionId;
    }
}
