package com.form1099MISC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class CreateForm1099MiscRequest {

    @JsonProperty("ReturnData")
    private List<ReturnData> ReturnData;
    @JsonProperty("ReturnHeader")
    private ReturnHeader ReturnHeader;
    @JsonProperty("SubmissionManifest")
    private SubmissionManifest SubmissionManifest;

    public List<ReturnData> getReturnData() {
        return ReturnData;
    }

    public void setReturnData(List<ReturnData> returnData) {
        ReturnData = returnData;
    }

    public ReturnHeader getReturnHeader() {
        return ReturnHeader;
    }

    public void setReturnHeader(ReturnHeader returnHeader) {
        ReturnHeader = returnHeader;
    }

    public SubmissionManifest getSubmissionManifest() {
        return SubmissionManifest;
    }

    public void setSubmissionManifest(SubmissionManifest submissionManifest) {
        SubmissionManifest = submissionManifest;
    }
}
