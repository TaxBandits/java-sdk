package com.form1099MISC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ReturnData {

    @JsonProperty("Recipient")
    private RequestRecipient Recipient;
    @JsonProperty("MISCFormData")
    private MISCFormData MISCFormData;
    @JsonProperty("RecordId")
    private String RecordId;
    @JsonProperty("SequenceId")
    private String SequenceId;

    public RequestRecipient getRecipient() {
        return Recipient;
    }

    public void setRecipient(RequestRecipient recipient) {
        Recipient = recipient;
    }

    public MISCFormData getMISCFormData() {
        return MISCFormData;
    }

    public void setMISCFormData(MISCFormData MISCFormData) {
        this.MISCFormData = MISCFormData;
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
}
