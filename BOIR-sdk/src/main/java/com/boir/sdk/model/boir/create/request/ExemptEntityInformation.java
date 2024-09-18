package com.boir.sdk.model.boir.create.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ExemptEntityInformation {

    @JsonProperty("EntityLegalNm")
    private String EntityLegalNm;

    public String getEntityLegalNm() {
        return EntityLegalNm;
    }

    public void setEntityLegalNm(String entityLegalNm) {
        this.EntityLegalNm = entityLegalNm;
    }

}
