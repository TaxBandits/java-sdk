
package com.formw2.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Postal {

    @JsonProperty("Info")
    private String Info;
    @JsonProperty("Status")
    private String Status;
    @JsonProperty("StatusTs")
    private String StatusTs;

    public String getInfo() {
        return Info;
    }

    public void setInfo(String info) {
        Info = info;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public String getStatusTs() {
        return StatusTs;
    }

    public void setStatusTs(String statusTs) {
        StatusTs = statusTs;
    }
}
