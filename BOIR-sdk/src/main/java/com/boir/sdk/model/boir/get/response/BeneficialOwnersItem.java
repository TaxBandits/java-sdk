package com.boir.sdk.model.boir.get.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BeneficialOwnersItem {
    @JsonProperty("IsRemoved")
    private Boolean IsRemoved;

    @JsonProperty("LastNm")
    private String LastNm;

    @JsonProperty("BeneficialOwnerId")
    private String BeneficialOwnerId;

    @JsonProperty("IsExemptEntity")
    private Boolean IsExemptEntity;

    @JsonProperty("ExemptEntityInformation")
    private ExemptEntityInformation ExemptEntityInformation;

    @JsonProperty("FirstNm")
    private String FirstNm;

    @JsonProperty("Suffix")
    private String Suffix;

    @JsonProperty("MiddleNm")
    private String MiddleNm;

    @JsonProperty("DOB")
    private String DOB;

    @JsonProperty("FormOfIdentification")
    private FormOfIdentification FormOfIdentification;

    @JsonProperty("FinCENID")
    private String FinCENID;

    @JsonProperty("ResidentialAddress")
    private ResidentialAddress ResidentialAddress;

    @JsonProperty("SequenceId")
    private String SequenceId;

    @JsonProperty("IsParentOrGuardian")
    private Boolean IsParentOrGuardian;

    public Boolean getRemoved() {
        return IsRemoved;
    }

    public void setRemoved(Boolean removed) {
        IsRemoved = removed;
    }

    public String getLastNm() {
        return LastNm;
    }

    public void setLastNm(String lastNm) {
        LastNm = lastNm;
    }

    public String getBeneficialOwnerId() {
        return BeneficialOwnerId;
    }

    public void setBeneficialOwnerId(String beneficialOwnerId) {
        BeneficialOwnerId = beneficialOwnerId;
    }

    public Boolean getExemptEntity() {
        return IsExemptEntity;
    }

    public void setExemptEntity(Boolean exemptEntity) {
        IsExemptEntity = exemptEntity;
    }

    public ExemptEntityInformation getExemptEntityInformation() {
        return ExemptEntityInformation;
    }

    public void setExemptEntityInformation(ExemptEntityInformation exemptEntityInformation) {
        ExemptEntityInformation = exemptEntityInformation;
    }

    public String getFirstNm() {
        return FirstNm;
    }

    public void setFirstNm(String firstNm) {
        FirstNm = firstNm;
    }

    public String getSuffix() {
        return Suffix;
    }

    public void setSuffix(String suffix) {
        Suffix = suffix;
    }

    public String getMiddleNm() {
        return MiddleNm;
    }

    public void setMiddleNm(String middleNm) {
        MiddleNm = middleNm;
    }

    public String getDOB() {
        return DOB;
    }

    public void setDOB(String DOB) {
        this.DOB = DOB;
    }

    public FormOfIdentification getFormOfIdentification() {
        return FormOfIdentification;
    }

    public void setFormOfIdentification(FormOfIdentification formOfIdentification) {
        FormOfIdentification = formOfIdentification;
    }

    public String getFinCENID() {
        return FinCENID;
    }

    public void setFinCENID(String finCENID) {
        FinCENID = finCENID;
    }

    public ResidentialAddress getResidentialAddress() {
        return ResidentialAddress;
    }

    public void setResidentialAddress(ResidentialAddress residentialAddress) {
        ResidentialAddress = residentialAddress;
    }

    public String getSequenceId() {
        return SequenceId;
    }

    public void setSequenceId(String sequenceId) {
        SequenceId = sequenceId;
    }

    public Boolean getParentOrGuardian() {
        return IsParentOrGuardian;
    }

    public void setParentOrGuardian(Boolean parentOrGuardian) {
        IsParentOrGuardian = parentOrGuardian;
    }
}
