package com.form1099K.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SigningAuthority {

    @JsonProperty("BusinessMemberType")
    private String BusinessMemberType;
    @JsonProperty("Name")
    private String Name;
    @JsonProperty("Phone")
    private String Phone;

    public String getBusinessMemberType() {
        return BusinessMemberType;
    }

    public void setBusinessMemberType(String businessMemberType) {
        BusinessMemberType = businessMemberType;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getPhone() {
        return Phone;
    }

    public void setPhone(String phone) {
        Phone = phone;
    }
}
