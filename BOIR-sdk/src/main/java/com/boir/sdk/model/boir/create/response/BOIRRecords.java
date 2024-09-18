package com.boir.sdk.model.boir.create.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BOIRRecords {
    @JsonProperty("SuccessRecords")
    private SuccessRecords SuccessRecords = null;
    @JsonProperty("ErrorRecords")
    private ErrorRecords ErrorRecords = null;

    public SuccessRecords getSuccessRecords() {
        return SuccessRecords;
    }

    public void setSuccessRecords(SuccessRecords successRecords) {
        SuccessRecords = successRecords;
    }

    public ErrorRecords getErrorRecords() {
        return ErrorRecords;
    }

    public void setErrorRecords(ErrorRecords errorRecords) {
        ErrorRecords = errorRecords;
    }
}
