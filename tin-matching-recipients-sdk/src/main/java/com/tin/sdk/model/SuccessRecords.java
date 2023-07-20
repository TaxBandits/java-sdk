package com.tin.sdk.model;

public class SuccessRecords {

    private Long NumOfAttemptsRmng;
    private String RecipientId;
    private String RecordId;
    private String SequenceId;
    private String Status;
    private String StatusTs;
    private String TIN;
    private String TINType;

    private String RequestedType;

    public Long getNumOfAttemptsRmng() {
        return NumOfAttemptsRmng;
    }

    public void setNumOfAttemptsRmng(Long numOfAttemptsRmng) {
        NumOfAttemptsRmng = numOfAttemptsRmng;
    }

    public String getRecipientId() {
        return RecipientId;
    }

    public void setRecipientId(String recipientId) {
        RecipientId = recipientId;
    }

    public String getRecordId() {
        return RecordId;
    }

    public void setRecordId(String recordId) {
        RecordId = recordId;
    }

    public String getSequenceId() {
        return SequenceId;
    }

    public void setSequenceId(String sequenceId) {
        SequenceId = sequenceId;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public String getStatusTs() {
        return StatusTs;
    }

    public void setStatusTs(String statusTs) {
        StatusTs = statusTs;
    }

    public String getTIN() {
        return TIN;
    }

    public void setTIN(String TIN) {
        this.TIN = TIN;
    }

    public String getTINType() {
        return TINType;
    }

    public void setTINType(String TINType) {
        this.TINType = TINType;
    }

    public String getRequestedType() {
        return RequestedType;
    }

    public void setRequestedType(String requestedType) {
        RequestedType = requestedType;
    }
}
