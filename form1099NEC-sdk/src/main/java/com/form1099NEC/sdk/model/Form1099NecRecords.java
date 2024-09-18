package com.form1099NEC.sdk.model;

import java.util.List;

public class Form1099NecRecords {

    private List<ErrorRecord> ErrorRecords;
    private List<SuccessRecords> SuccessRecords;

    public List<ErrorRecord> getErrorRecords() {
        return ErrorRecords;
    }

    public void setErrorRecords(List<ErrorRecord> errorRecords) {
        ErrorRecords = errorRecords;
    }

    public List<SuccessRecords> getSuccessRecords() {
        return SuccessRecords;
    }

    public void setSuccessRecords(List<SuccessRecords> successRecords) {
        SuccessRecords = successRecords;
    }
}
