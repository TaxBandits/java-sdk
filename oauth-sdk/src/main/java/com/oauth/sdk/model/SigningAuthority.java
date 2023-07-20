package com.oauth.sdk.model;

public class SigningAuthority {

    private String BusinessMemberType;
    private String Name;
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
