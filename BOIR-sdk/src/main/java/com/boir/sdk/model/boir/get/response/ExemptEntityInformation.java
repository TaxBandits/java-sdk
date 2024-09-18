package com.boir.sdk.model.boir.get.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ExemptEntityInformation {

    @JsonProperty("ValidateEntityLegalNm")
    private String ValidateEntityLegalNm;

    @JsonProperty("IndividualLastNm")
    private String IndividualLastNm;

    public String getValidateEntityLegalNm() {
        return ValidateEntityLegalNm;
    }

    public void setValidateEntityLegalNm(String validateEntityLegalNm) {
        ValidateEntityLegalNm = validateEntityLegalNm;
    }

    public String getIndividualLastNm() {
        return IndividualLastNm;
    }

    public void setIndividualLastNm(String individualLastNm) {
        IndividualLastNm = individualLastNm;
    }
}
