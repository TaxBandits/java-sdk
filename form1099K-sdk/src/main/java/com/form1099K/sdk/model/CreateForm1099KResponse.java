package com.form1099K.sdk.model;

import java.util.List;

public class CreateForm1099KResponse {

    private String BusinessId;
    private List<Error> Errors;
    private Form1099Records Form1099Records;
    private String Form1099Type;
    private String PayerRef;
    private Long StatusCode;
    private String StatusMessage;
    private String StatusName;
    private String SubmissionId;
    private List<ErrorRecords> ErrorRecords;

    public String getBusinessId() {
        return BusinessId;
    }

    public void setBusinessId(String businessId) {
        BusinessId = businessId;
    }

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

    public Form1099Records getForm1099Records() {
        return Form1099Records;
    }

    public void setForm1099Records(Form1099Records form1099Records) {
        Form1099Records = form1099Records;
    }

    public String getForm1099Type() {
        return Form1099Type;
    }

    public void setForm1099Type(String form1099Type) {
        Form1099Type = form1099Type;
    }

    public String getPayerRef() {
        return PayerRef;
    }

    public void setPayerRef(String payerRef) {
        PayerRef = payerRef;
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

    public List<ErrorRecords> getErrorRecords() {
        return ErrorRecords;
    }

    public void setErrorRecords(List<ErrorRecords> errorRecords) {
        ErrorRecords = errorRecords;
    }
}
