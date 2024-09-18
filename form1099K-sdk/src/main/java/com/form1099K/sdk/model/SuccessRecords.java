package com.form1099K.sdk.model;

public class SuccessRecords {

    private Files Files;
    private String RecordId;
    private String Status;
    private String SequenceId;
    private String StatusTs;

    public Files getFiles() {
        return Files;
    }

    public void setFiles(Files files) {
        Files = files;
    }

    public String getRecordId() {
        return RecordId;
    }

    public void setRecordId(String recordId) {
        RecordId = recordId;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public String getSequenceId() {
        return SequenceId;
    }

    public void setSequenceId(String sequenceId) {
        SequenceId = sequenceId;
    }

    public String getStatusTs() {
        return StatusTs;
    }

    public void setStatusTs(String statusTs) {
        StatusTs = statusTs;
    }
}
