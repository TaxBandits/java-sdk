package com.form1099K.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ReturnData {

    @JsonProperty("Recipient")
    private RequestRecipient Recipient;
    @JsonProperty("KFormData")
    private KFormData KFormData;
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

    public KFormData getKFormData() {
        return KFormData;
    }

    public void setKFormData(KFormData KFormData) {
        this.KFormData = KFormData;
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
