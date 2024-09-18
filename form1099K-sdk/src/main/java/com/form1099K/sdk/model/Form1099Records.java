package com.form1099K.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Form1099Records {

    @JsonProperty("ErrorRecords")
    private List<ErrorRecords> ErrorRecords;
    @JsonProperty("SuccessRecords")
    private List<SuccessRecords> SuccessRecords;
    @JsonProperty("SubmissionManifest")
    private SubmissionManifest SubmissionManifest;
    @JsonProperty("ReturnHeader")
    private ReturnHeader ReturnHeader;
    @JsonProperty("ReturnData")
    private List<ReturnData> ReturnData;
    @JsonProperty("KFormData")
    private KFormData KFormData;

    public List<ErrorRecords> getErrorRecords() {
        return ErrorRecords;
    }

    public void setErrorRecords(List<ErrorRecords> errorRecords) {
        ErrorRecords = errorRecords;
    }

    public List<SuccessRecords> getSuccessRecords() {
        return SuccessRecords;
    }

    public void setSuccessRecords(List<SuccessRecords> successRecords) {
        SuccessRecords = successRecords;
    }

    public SubmissionManifest getSubmissionManifest() {
        return SubmissionManifest;
    }

    public void setSubmissionManifest(SubmissionManifest submissionManifest) {
        SubmissionManifest = submissionManifest;
    }

    public ReturnHeader getReturnHeader() {
        return ReturnHeader;
    }

    public void setReturnHeader(ReturnHeader returnHeader) {
        ReturnHeader = returnHeader;
    }

    public List<ReturnData> getReturnData() {
        return ReturnData;
    }

    public void setReturnData(List<ReturnData> returnData) {
        ReturnData = returnData;
    }

    public KFormData getKFormData() {
        return KFormData;
    }

    public void setKFormData(KFormData KFormData) {
        this.KFormData = KFormData;
    }
}
