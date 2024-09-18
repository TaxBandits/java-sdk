
package com.formw2.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class StateReturn {

    @JsonProperty("Errors")
    private List<Error> Errors;
    @JsonProperty("Info")
    private String Info;
    @JsonProperty("StateCd")
    private String StateCd;
    @JsonProperty("Status")
    private String Status;
    @JsonProperty("StatusTs")
    private String StatusTs;

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

    public String getInfo() {
        return Info;
    }

    public void setInfo(String info) {
        Info = info;
    }

    public String getStateCd() {
        return StateCd;
    }

    public void setStateCd(String stateCd) {
        StateCd = stateCd;
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
