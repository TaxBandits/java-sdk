package com.boir.sdk.model.boir.create.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FormOfIdentification {
    @JsonProperty("ForeignDocumentCountry")
    private String ForeignDocumentCountry;
    @JsonProperty("OtherLocalOrTribal")
    private String OtherLocalOrTribal;
    @JsonProperty("DocumentType")
    private String DocumentType;
    @JsonProperty("DocumentNumber")
    private String DocumentNumber;
    @JsonProperty("DocumentIssuedLocalOrTribal")
    private String DocumentIssuedLocalOrTribal;
    @JsonProperty("DocumentIssuedState")
    private String DocumentIssuedState;

    public String getForeignDocumentCountry() {
        return ForeignDocumentCountry;
    }

    public void setForeignDocumentCountry(String foreignDocumentCountry) {
        ForeignDocumentCountry = foreignDocumentCountry;
    }

    public String getOtherLocalOrTribal() {
        return OtherLocalOrTribal;
    }

    public void setOtherLocalOrTribal(String otherLocalOrTribal) {
        OtherLocalOrTribal = otherLocalOrTribal;
    }

    public String getDocumentType() {
        return DocumentType;
    }

    public void setDocumentType(String documentType) {
        DocumentType = documentType;
    }

    public String getDocumentNumber() {
        return DocumentNumber;
    }

    public void setDocumentNumber(String documentNumber) {
        DocumentNumber = documentNumber;
    }

    public String getDocumentIssuedLocalOrTribal() {
        return DocumentIssuedLocalOrTribal;
    }

    public void setDocumentIssuedLocalOrTribal(String documentIssuedLocalOrTribal) {
        DocumentIssuedLocalOrTribal = documentIssuedLocalOrTribal;
    }

    public String getDocumentIssuedState() {
        return DocumentIssuedState;
    }

    public void setDocumentIssuedState(String documentIssuedState) {
        DocumentIssuedState = documentIssuedState;
    }
}
