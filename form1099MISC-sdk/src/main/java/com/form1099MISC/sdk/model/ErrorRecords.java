package com.form1099MISC.sdk.model;

import java.util.List;

public class ErrorRecords {

    private List<Error> Errors;
    private String Name;
    private String RecipientId;
    private String SequenceId;
    private String TIN;
    private String TINType;
    private String RecordId;
    private String RequestedType;

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getRecipientId() {
        return RecipientId;
    }

    public void setRecipientId(String recipientId) {
        RecipientId = recipientId;
    }

    public String getSequenceId() {
        return SequenceId;
    }

    public void setSequenceId(String sequenceId) {
        SequenceId = sequenceId;
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

    public String getRecordId() {
        return RecordId;
    }

    public void setRecordId(String recordId) {
        this.RecordId = recordId;
    }

    public String getRequestedType() {
        return RequestedType;
    }

    public void setRequestedType(String requestedType) {
        RequestedType = requestedType;
    }
}
