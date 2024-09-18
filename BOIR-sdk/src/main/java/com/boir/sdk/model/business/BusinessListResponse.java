package com.boir.sdk.model.business;

import com.boir.sdk.model.Error;

import java.util.List;

public class BusinessListResponse {

    private List<Business> Businesses;
    private List<Error> Errors;
    private Long Page;
    private Long PageSize;
    private Long StatusCode;
    private String StatusMessage;
    private String StatusName;
    private Long TotalPages;
    private Long TotalRecords;

    public List<Business> getBusinesses() {
        return Businesses;
    }

    public void setBusinesses(List<Business> businesses) {
        Businesses = businesses;
    }

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

    public Long getPage() {
        return Page;
    }

    public void setPage(Long page) {
        Page = page;
    }

    public Long getPageSize() {
        return PageSize;
    }

    public void setPageSize(Long pageSize) {
        PageSize = pageSize;
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

    public Long getTotalPages() {
        return TotalPages;
    }

    public void setTotalPages(Long totalPages) {
        TotalPages = totalPages;
    }

    public Long getTotalRecords() {
        return TotalRecords;
    }

    public void setTotalRecords(Long totalRecords) {
        TotalRecords = totalRecords;
    }
}
