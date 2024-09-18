package com.wh_certificate.sdk.model;

import java.util.List;

public class WhCertificate {

    private ErrorRecords ErrorRecords;
    private List<SuccessRecord> SuccessRecords;

    public ErrorRecords getErrorRecords() {
        return ErrorRecords;
    }

    public void setErrorRecords(ErrorRecords errorRecords) {
        ErrorRecords = errorRecords;
    }

    public List<SuccessRecord> getSuccessRecords() {
        return SuccessRecords;
    }

    public void setSuccessRecords(List<SuccessRecord> successRecords) {
        SuccessRecords = successRecords;
    }
}
