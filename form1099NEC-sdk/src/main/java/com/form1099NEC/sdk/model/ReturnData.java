package com.form1099NEC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ReturnData {

    @JsonProperty("Recipient")
    private RequestRecipient Recipient;
    @JsonProperty("NECFormData")
    private NECFormData NECFormData;
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

    public NECFormData getNECFormData() {
        return NECFormData;
    }

    public void setNECFormData(NECFormData NECFormData) {
        this.NECFormData = NECFormData;
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
