package com.wh_certificate.sdk.model;

import java.util.List;

public class StatusResponse {

    private List<Error> Errors;
    private String PayeeRef;
    private Requester Requester;
    private List<Status> Status;
    private Long TotalRecords;

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

    public String getPayeeRef() {
        return PayeeRef;
    }

    public void setPayeeRef(String payeeRef) {
        PayeeRef = payeeRef;
    }

    public com.wh_certificate.sdk.model.Requester getRequester() {
        return Requester;
    }

    public void setRequester(com.wh_certificate.sdk.model.Requester requester) {
        Requester = requester;
    }

    public List<com.wh_certificate.sdk.model.Status> getStatus() {
        return Status;
    }

    public void setStatus(List<com.wh_certificate.sdk.model.Status> status) {
        Status = status;
    }

    public Long getTotalRecords() {
        return TotalRecords;
    }

    public void setTotalRecords(Long totalRecords) {
        TotalRecords = totalRecords;
    }
}
