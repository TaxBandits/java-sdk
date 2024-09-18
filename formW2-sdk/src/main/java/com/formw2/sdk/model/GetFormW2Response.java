package com.formw2.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class GetFormW2Response {

    @JsonProperty("Errors")
    private List<Error> Errors;
    @JsonProperty("Form1099Records")
    private FormW2Records Form1099Records;
    @JsonProperty("StatusCode")
    private Long StatusCode;
    @JsonProperty("StatusMessage")
    private String StatusMessage;
    @JsonProperty("StatusName")
    private String StatusName;

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

    public FormW2Records getForm1099Records() {
        return Form1099Records;
    }

    public void setForm1099Records(FormW2Records form1099Records) {
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
