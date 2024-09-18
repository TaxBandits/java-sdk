package com.form1099MISC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RequestDraftPdfUrlResponse {

    @JsonProperty("DraftPdfUrl")
    private String DraftPdfUrl;
    @JsonProperty("Error")
    private Error Error;
    @JsonProperty("PayeeRef")
    private String PayeeRef;
    @JsonProperty("RecipientId")
    private String RecipientId;
    @JsonProperty("RecordId")
    private String RecordId;
    @JsonProperty("BlobData")
    private byte[] BlobData;

    public String getDraftPdfUrl() {
        return DraftPdfUrl;
    }

    public void setDraftPdfUrl(String draftPdfUrl) {
        DraftPdfUrl = draftPdfUrl;
    }

    public Error getError() {
        return Error;
    }

    public void setError(Error error) {
        Error = error;
    }

    public String getPayeeRef() {
        return PayeeRef;
    }

    public void setPayeeRef(String payeeRef) {
        PayeeRef = payeeRef;
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

    public byte[] getBlobData() {
        return BlobData;
    }

    public void setBlobData(byte[] blobData) {
        BlobData = blobData;
    }
}
