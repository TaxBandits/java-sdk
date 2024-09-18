package com.boir.sdk.model.boir.create.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SubmitterInformation {
    @JsonProperty("FirstNm")
    private String FirstNm;
    @JsonProperty("Email")
    private String Email;
    @JsonProperty("LastNm")
    private String LastNm;

    public String getFirstNm() {
        return FirstNm;
    }

    public void setFirstNm(String firstNm) {
        FirstNm = firstNm;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getLastNm() {
        return LastNm;
    }

    public void setLastNm(String lastNm) {
        LastNm = lastNm;
    }
}
