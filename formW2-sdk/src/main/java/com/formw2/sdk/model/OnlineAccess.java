
package com.formw2.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OnlineAccess {

    @JsonProperty("Email")
    private String Email;
    @JsonProperty("Info")
    private String Info;
    @JsonProperty("Status")
    private String Status;

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

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
}
