package com.form1099MISC.sdk.model;

import java.util.List;

public class RequestPdfURLsResponse {

    private List<Error> Errors;
    private Form1099MiscRecords Form1099MISCRecords;
    private String SubmissionId;

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

    public Form1099MiscRecords getForm1099MISCRecords() {
        return Form1099MISCRecords;
    }

    public void setForm1099MISCRecords(Form1099MiscRecords form1099MISCRecords) {
        Form1099MISCRecords = form1099MISCRecords;
    }

    public String getSubmissionId() {
        return SubmissionId;
    }

    public void setSubmissionId(String submissionId) {
        SubmissionId = submissionId;
    }
}
