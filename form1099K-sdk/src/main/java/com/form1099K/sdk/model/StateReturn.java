package com.form1099K.sdk.model;

import java.util.List;

public class StateReturn {

    private List<Error> Errors;
    private String Info;
    private String StateCd;
    private String Status;
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
