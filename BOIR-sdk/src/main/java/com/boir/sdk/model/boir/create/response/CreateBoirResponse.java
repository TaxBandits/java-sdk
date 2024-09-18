package com.boir.sdk.model.boir.create.response;

import com.boir.sdk.model.Error;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class CreateBoirResponse {

    @JsonProperty("StatusTs")
    private String StatusTs;
    @JsonProperty("SubmissionId")
    private String SubmissionId;
    @JsonProperty("ReportNumber")
    private String ReportNumber;
    @JsonProperty("ReportingCompanyId")
    private String ReportingCompanyId;
    @JsonProperty("ReportStatus")
    private String ReportStatus;
    @JsonProperty("StatusCode")
    private int StatusCode;
    @JsonProperty("StatusMessage")
    private String StatusMessage;
    @JsonProperty("ReportType")
    private String ReportType;
    @JsonProperty("BOIRRecords")
    private BOIRRecords BOIRRecords = null;
    @JsonProperty("Errors")
    private List<Error> Errors = null;

    public String getStatusTs() {
        return StatusTs;
    }

    public void setStatusTs(String statusTs) {
        StatusTs = statusTs;
    }

    public String getSubmissionId() {
        return SubmissionId;
    }

    public void setSubmissionId(String submissionId) {
        SubmissionId = submissionId;
    }

    public String getReportNumber() {
        return ReportNumber;
    }

    public void setReportNumber(String reportNumber) {
        ReportNumber = reportNumber;
    }

    public String getReportingCompanyId() {
        return ReportingCompanyId;
    }

    public void setReportingCompanyId(String reportingCompanyId) {
        ReportingCompanyId = reportingCompanyId;
    }

    public String getReportStatus() {
        return ReportStatus;
    }

    public void setReportStatus(String reportStatus) {
        ReportStatus = reportStatus;
    }

    public String getStatusMessage() {
        return StatusMessage;
    }

    public void setStatusMessage(String statusMessage) {
        StatusMessage = statusMessage;
    }

    public int getStatusCode() {
        return StatusCode;
    }

    public void setStatusCode(int statusCode) {
        StatusCode = statusCode;
    }

    public String getReportType() {
        return ReportType;
    }

    public void setReportType(String reportType) {
        ReportType = reportType;
    }

    public BOIRRecords getBOIRRecords() {
        return BOIRRecords;
    }

    public void setBOIRRecords(BOIRRecords BOIRRecords) {
        this.BOIRRecords = BOIRRecords;
    }

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }
}
