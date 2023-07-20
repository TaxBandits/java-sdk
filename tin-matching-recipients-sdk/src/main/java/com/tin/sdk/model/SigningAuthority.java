package com.tin.sdk.model;

import com.google.gson.annotations.SerializedName;

public class SigningAuthority {

    @SerializedName(value = "businessMemberType", alternate = {"BusinessMemberType"})
    private String BusinessMemberType;
    @SerializedName(value = "name", alternate = {"Name"})
    private String Name;
    @SerializedName(value = "phone", alternate = {"Phone"})
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
