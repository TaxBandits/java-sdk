package com.form1099K.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RequestDraftPdfUrlRequest {

    @JsonProperty("Business")
    private String Business;
    @JsonProperty("Recipient")
    private Recipient Recipient;
    @JsonProperty("RecordId")
    private String RecordId;
    @JsonProperty("TaxYear")
    private String TaxYear;

    public String getBusiness() {
        return Business;
    }

    public void setBusiness(String business) {
        Business = business;
    }

    public Recipient getRecipient() {
        return Recipient;
    }

    public void setRecipient(Recipient recipient) {
        Recipient = recipient;
    }

    public String getRecordId() {
        return RecordId;
    }

    public void setRecordId(String recordId) {
        RecordId = recordId;
    }

    public String getTaxYear() {
        return TaxYear;
    }

    public void setTaxYear(String taxYear) {
        TaxYear = taxYear;
    }
}
