package com.tin.sdk.model;

import java.util.List;

public class TINMatchingRecord {

    private List<SuccessRecords> SuccessRecords;
    private List<ErrorRecords> ErrorRecords;
    private List<Error> Errors;

    public List<SuccessRecords> getSuccessRecords() {
        return SuccessRecords;
    }

    public void setSuccessRecords(List<SuccessRecords> successRecords) {
        SuccessRecords = successRecords;
    }

    public List<ErrorRecords> getErrorRecords() {
        return ErrorRecords;
    }

    public void setErrorRecords(List<ErrorRecords> errorRecords) {
        ErrorRecords = errorRecords;
    }

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }

}
