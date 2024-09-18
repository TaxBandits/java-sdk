package com.formW9.sdk.model;

import java.util.List;

public class FormW9RecordByEmail {

    private List<SuccessRecord> SuccessRecords;
    private List<ErrorRecord> ErrorRecords;

    public List<SuccessRecord> getSuccessRecords() {
        return SuccessRecords;
    }

    public void setSuccessRecords(List<SuccessRecord> successRecords) {
        SuccessRecords = successRecords;
    }

    public List<ErrorRecord> getErrorRecords() {
        return ErrorRecords;
    }

    public void setErrorRecords(List<ErrorRecord> errorRecords) {
        ErrorRecords = errorRecords;
    }

}
