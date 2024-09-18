
package com.formW9.sdk.model;

public class SuccessRecord {

    private String Email;
    private String PayeeRef;
    private String StatusTs;
    private String W9Status;

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getPayeeRef() {
        return PayeeRef;
    }

    public void setPayeeRef(String payeeRef) {
        PayeeRef = payeeRef;
    }

    public String getStatusTs() {
        return StatusTs;
    }

    public void setStatusTs(String statusTs) {
        StatusTs = statusTs;
    }

    public String getW9Status() {
        return W9Status;
    }

    public void setW9Status(String w9Status) {
        W9Status = w9Status;
    }
}
