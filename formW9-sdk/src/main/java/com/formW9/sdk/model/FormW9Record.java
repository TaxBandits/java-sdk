
package com.formW9.sdk.model;

public class FormW9Record {

    private String Email;
    private String FormW9RequestType;
    private String Line1Nm;
    private String PayeeRef;
    private String PdfUrl;
    private String StatusTs;
    private String SubmissionId;
    private TINMatching TINMatching;
    private String W9Status;

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getFormW9RequestType() {
        return FormW9RequestType;
    }

    public void setFormW9RequestType(String formW9RequestType) {
        FormW9RequestType = formW9RequestType;
    }

    public String getLine1Nm() {
        return Line1Nm;
    }

    public void setLine1Nm(String line1Nm) {
        Line1Nm = line1Nm;
    }

    public String getPayeeRef() {
        return PayeeRef;
    }

    public void setPayeeRef(String payeeRef) {
        PayeeRef = payeeRef;
    }

    public String getPdfUrl() {
        return PdfUrl;
    }

    public void setPdfUrl(String pdfUrl) {
        PdfUrl = pdfUrl;
    }

    public String getStatusTs() {
        return StatusTs;
    }

    public void setStatusTs(String statusTs) {
        StatusTs = statusTs;
    }

    public String getSubmissionId() {
        return SubmissionId;
    }

    public void setSubmissionId(String submissionId) {
        SubmissionId = submissionId;
    }

    public com.formW9.sdk.model.TINMatching getTINMatching() {
        return TINMatching;
    }

    public void setTINMatching(com.formW9.sdk.model.TINMatching TINMatching) {
        this.TINMatching = TINMatching;
    }

    public String getW9Status() {
        return W9Status;
    }

    public void setW9Status(String w9Status) {
        W9Status = w9Status;
    }
}
