package com.wh_certificate.sdk.model;

public class SuccessRecord {

    private String Email;
    private String PayeeRef;
    private String StatusTs;
    private String WhCertificateStatus;

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

    public String getWhCertificateStatus() {
        return WhCertificateStatus;
    }

    public void setWhCertificateStatus(String whCertificateStatus) {
        WhCertificateStatus = whCertificateStatus;
    }
}
