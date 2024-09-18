package com.boir.sdk.model.boir.get.request;

public class GetBOIRRequest {

    private String submissionId;
    private String reportNumber;

    public String getSubmissionId() {
        return submissionId;
    }

    public void setSubmissionId(String submissionId) {
        this.submissionId = submissionId;
    }

    public String getReportNumber() {
        return reportNumber;
    }

    public void setReportNumber(String reportNumber) {
        this.reportNumber = reportNumber;
    }
}
