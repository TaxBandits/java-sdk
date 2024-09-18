package com.form1099MISC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Customization {

    @JsonProperty("TINMaskType")
    private String TINMaskType;

    public String getTINMaskType() {
        return TINMaskType;
    }

    public void setTINMaskType(String TINMaskType) {
        this.TINMaskType = TINMaskType;
    }
}
