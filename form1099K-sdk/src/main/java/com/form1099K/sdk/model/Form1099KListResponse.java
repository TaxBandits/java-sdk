package com.form1099K.sdk.model;

import java.util.List;

public class Form1099KListResponse {

    private String StatusName;
    private String StatusMessage;
    private String Form1099Type;
    private long Page;
    private long TotalRecords;
    private long TotalPages;
    private long PageSize;
    private List<Error> Errors;
    private List<Form1099Record> Form1099Records;
    private SubmissionManifest SubmissionManifest;

    public String getStatusName() {
        return StatusName;
    }

    public void setStatusName(String statusName) {
        StatusName = statusName;
    }

    public String getStatusMessage() {
        return StatusMessage;
    }

    public void setStatusMessage(String statusMessage) {
        StatusMessage = statusMessage;
    }

    public String getForm1099Type() {
        return Form1099Type;
    }

    public void setForm1099Type(String form1099Type) {
        Form1099Type = form1099Type;
    }

    public long getPage() {
        return Page;
    }

    public void setPage(long page) {
        Page = page;
    }

    public long getTotalRecords() {
        return TotalRecords;
    }

    public void setTotalRecords(long totalRecords) {
        TotalRecords = totalRecords;
    }

    public long getTotalPages() {
        return TotalPages;
    }

    public void setTotalPages(long totalPages) {
        TotalPages = totalPages;
    }

    public long getPageSize() {
        return PageSize;
    }

    public void setPageSize(long pageSize) {
        PageSize = pageSize;
    }

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

    public List<Form1099Record> getForm1099Records() {
        return Form1099Records;
    }

    public void setForm1099Records(List<Form1099Record> form1099Records) {
        Form1099Records = form1099Records;
    }

    public SubmissionManifest getSubmissionManifest() {
        return SubmissionManifest;
    }

    public void setSubmissionManifest(SubmissionManifest submissionManifest) {
        SubmissionManifest = submissionManifest;
    }
}
