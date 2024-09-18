package com.form1099NEC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class TransmitRequest {

    @JsonProperty("RecordIds")
    private List<String> RecordIds;
    @JsonProperty("SubmissionId")
    private String SubmissionId;

    public List<String> getRecordIds() {
        return RecordIds;
    }

    public void setRecordIds(List<String> recordIds) {
        RecordIds = recordIds;
    }

    public String getSubmissionId() {
        return SubmissionId;
    }

    public void setSubmissionId(String submissionId) {
        SubmissionId = submissionId;
    }
}
