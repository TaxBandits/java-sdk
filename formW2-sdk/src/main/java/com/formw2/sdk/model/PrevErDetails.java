
package com.formw2.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PrevErDetails {

    @JsonProperty("PrevErEIN")
    private String PrevErEIN;
    @JsonProperty("PrevErName")
    private String PrevErName;

    public String getPrevErEIN() {
        return PrevErEIN;
    }

    public void setPrevErEIN(String prevErEIN) {
        PrevErEIN = prevErEIN;
    }

    public String getPrevErName() {
        return PrevErName;
    }

    public void setPrevErName(String prevErName) {
        PrevErName = prevErName;
    }
}
