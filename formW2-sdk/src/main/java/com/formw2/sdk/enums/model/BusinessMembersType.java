package com.formw2.sdk.enums.model;

public class BusinessMembersType {

    private String businessTypeEnumValue;
    private String businessMembersTypeEnumValue;
    private String businessMembersTypeDisplayName;

    public BusinessMembersType(String businessTypeEnumValue, String businessMembersTypeEnumValue, String businessMembersTypeDisplayName) {
        this.businessTypeEnumValue = businessTypeEnumValue;
        this.businessMembersTypeEnumValue = businessMembersTypeEnumValue;
        this.businessMembersTypeDisplayName = businessMembersTypeDisplayName;
    }

    public String getBusinessTypeEnumValue() {
        return businessTypeEnumValue;
    }

    public void setBusinessTypeEnumValue(String businessTypeEnumValue) {
        this.businessTypeEnumValue = businessTypeEnumValue;
    }

    public String getBusinessMembersTypeEnumValue() {
        return businessMembersTypeEnumValue;
    }

    public void setBusinessMembersTypeEnumValue(String businessMembersTypeEnumValue) {
        this.businessMembersTypeEnumValue = businessMembersTypeEnumValue;
    }

    public String getBusinessMembersTypeDisplayName() {
        return businessMembersTypeDisplayName;
    }

    public void setBusinessMembersTypeDisplayName(String businessMembersTypeDisplayName) {
        this.businessMembersTypeDisplayName = businessMembersTypeDisplayName;
    }
}
