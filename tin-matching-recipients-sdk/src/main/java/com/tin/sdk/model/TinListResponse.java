package com.tin.sdk.model;

import java.util.List;

public class TinListResponse {

    private Business Business;
    private List<TINMatchingRecords> TINMatchingRecords;
    private int TotalRecords;
    private int TotalPages;
    private int Page;
    private int PageSize;
    private List<Error> Errors;

    public Business getBusiness() {
        return Business;
    }

    public void setBusiness(Business business) {
        Business = business;
    }

    public List<TINMatchingRecords> getTINMatchingRecords() {
        return TINMatchingRecords;
    }

    public void setTINMatchingRecords(List<TINMatchingRecords> TINMatchingRecords) {
        this.TINMatchingRecords = TINMatchingRecords;
    }

    public int getTotalRecords() {
        return TotalRecords;
    }

    public void setTotalRecords(int totalRecords) {
        TotalRecords = totalRecords;
    }

    public int getTotalPages() {
        return TotalPages;
    }

    public void setTotalPages(int totalPages) {
        TotalPages = totalPages;
    }

    public int getPage() {
        return Page;
    }

    public void setPage(int page) {
        Page = page;
    }

    public int getPageSize() {
        return PageSize;
    }

    public void setPageSize(int pageSize) {
        PageSize = pageSize;
    }

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }
}
