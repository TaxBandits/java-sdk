
package com.formW9.sdk.model;

import java.util.List;

public class FormW9GetResponse {

    private String Email;
    private List<Error> Errors;
    private Object FormData;
    private String FormW9RequestType;
    private String PayeeRef;
    private String PdfUrl;
    private Requester Requester;
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

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

    public Object getFormData() {
        return FormData;
    }

    public void setFormData(Object formData) {
        FormData = formData;
    }

    public String getFormW9RequestType() {
        return FormW9RequestType;
    }

    public void setFormW9RequestType(String formW9RequestType) {
        FormW9RequestType = formW9RequestType;
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

    public com.formW9.sdk.model.Requester getRequester() {
        return Requester;
    }

    public void setRequester(com.formW9.sdk.model.Requester requester) {
        Requester = requester;
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
