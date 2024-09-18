
package com.formw2.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class FederalReturn {

    @JsonProperty("Errors")
    private List<Error> Errors;
    @JsonProperty("Status")
    private String Status;
    @JsonProperty("StatusTs")
    private String StatusTs;

    @JsonProperty("Info")
    private String Info;

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
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

    public String getInfo() {
        return Info;
    }

    public void setInfo(String info) {
        Info = info;
    }
}
