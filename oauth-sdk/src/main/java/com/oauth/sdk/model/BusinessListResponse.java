package com.oauth.sdk.model;

import java.util.List;

public class BusinessListResponse {

    private List<Business> Businesses;
    private Error Errors;
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

    public Error getErrors() {
        return Errors;
    }

    public void setErrors(Error errors) {
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
