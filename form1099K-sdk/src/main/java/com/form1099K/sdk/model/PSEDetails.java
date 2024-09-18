package com.form1099K.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PSEDetails {

    @JsonProperty("PSEName")
    private String PSEName;
    @JsonProperty("PSEPhone")
    private String PSEPhone;

    public String getPSEName() {
        return PSEName;
    }

    public void setPSEName(String PSEName) {
        this.PSEName = PSEName;
    }

    public String getPSEPhone() {
        return PSEPhone;
    }

    public void setPSEPhone(String PSEPhone) {
        this.PSEPhone = PSEPhone;
    }
}
