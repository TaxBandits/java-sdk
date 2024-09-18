
package com.formW9.sdk.model;

import java.util.List;

public class FormW9ListResponse {

    private List<Error> Errors;
    private List<FormW9Record> FormW9Records;
    private Long Page;
    private Long PageSize;
    private Requester Requester;
    private Long TotalPages;
    private Long TotalRecords;

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

    public List<FormW9Record> getFormW9Records() {
        return FormW9Records;
    }

    public void setFormW9Records(List<FormW9Record> formW9Records) {
        FormW9Records = formW9Records;
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

    public com.formW9.sdk.model.Requester getRequester() {
        return Requester;
    }

    public void setRequester(com.formW9.sdk.model.Requester requester) {
        Requester = requester;
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
