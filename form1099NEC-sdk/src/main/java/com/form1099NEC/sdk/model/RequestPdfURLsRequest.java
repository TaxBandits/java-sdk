package com.form1099NEC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class RequestPdfURLsRequest {

    @JsonProperty("Customization")
    private Customization Customization;
    @JsonProperty("RecordIds")
    private List<RecordId> RecordIds;
    @JsonProperty("SubmissionId")
    private String SubmissionId;

    public Customization getCustomization() {
        return Customization;
    }

    public void setCustomization(Customization customization) {
        Customization = customization;
    }

    public List<RecordId> getRecordIds() {
        return RecordIds;
    }

    public void setRecordIds(List<RecordId> recordIds) {
        RecordIds = recordIds;
    }

    public String getSubmissionId() {
        return SubmissionId;
    }

    public void setSubmissionId(String submissionId) {
        SubmissionId = submissionId;
    }
}
