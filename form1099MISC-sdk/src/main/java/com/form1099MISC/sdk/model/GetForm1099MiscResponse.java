package com.form1099MISC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class GetForm1099MiscResponse {

    @JsonProperty("Errors")
    private List<Error> Errors;
    @JsonProperty("Form1099Records")
    private Form1099Records Form1099Records;
    @JsonProperty("StatusCode")
    private Long StatusCode;
    @JsonProperty("StatusMessage")
    private String StatusMessage;
    @JsonProperty("StatusName")
    private String StatusName;

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> Errors) {
        this.Errors = Errors;
    }

    public Form1099Records getForm1099Records() {
        return Form1099Records;
    }

    public void setForm1099Records(Form1099Records form1099Records) {
        Form1099Records = form1099Records;
    }

    public Long getStatusCode() {
        return StatusCode;
    }

    public void setStatusCode(Long statusCode) {
        StatusCode = statusCode;
    }

    public String getStatusMessage() {
        return StatusMessage;
    }

    public void setStatusMessage(String statusMessage) {
        StatusMessage = statusMessage;
    }

    public String getStatusName() {
        return StatusName;
    }

    public void setStatusName(String statusName) {
        StatusName = statusName;
    }
}
