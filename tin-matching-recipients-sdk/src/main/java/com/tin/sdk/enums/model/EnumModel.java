package com.tin.sdk.enums.model;

public class EnumModel {

    private String enumValue;
    private String enumDisplayName;

    public EnumModel(String enumValue, String enumDisplayName) {
        this.enumValue = enumValue;
        this.enumDisplayName = enumDisplayName;
    }

    public String getEnumValue() {
        return enumValue;
    }

    public void setEnumValue(String enumValue) {
        this.enumValue = enumValue;
    }

    public String getEnumDisplayName() {
        return enumDisplayName;
    }

    public void setEnumDisplayName(String enumDisplayName) {
        this.enumDisplayName = enumDisplayName;
    }
}
