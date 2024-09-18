package com.form1099K.sdk.model;

import java.util.List;

public class RequestPdfURLsResponse {

    private List<Error> Errors;
    private Form1099KRecords Form1099KRecords;
    private String SubmissionId;

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

    public Form1099KRecords getForm1099KRecords() {
        return Form1099KRecords;
    }

    public void setForm1099KRecords(Form1099KRecords form1099KRecords) {
        Form1099KRecords = form1099KRecords;
    }

    public String getSubmissionId() {
        return SubmissionId;
    }

    public void setSubmissionId(String submissionId) {
        SubmissionId = submissionId;
    }
}
