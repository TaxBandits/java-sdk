package com.boir.sdk.model.boir.get.response;

import com.boir.sdk.model.Error;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class GetBOIRResponse {
    @JsonProperty("BOIRRecords")
    private BOIRRecords BOIRRecords;

    @JsonProperty("StatusName")
    private String StatusName;

    @JsonProperty("StatusCode")
    private Integer StatusCode;

    @JsonProperty("StatusMessage")
    private String StatusMessage;

    @JsonProperty("ReportNumber")
    private String ReportNumber;

    @JsonProperty("ReportType")
    private String ReportType;

    @JsonProperty("ReportStatus")
    private String ReportStatus;

    @JsonProperty("Errors")
    private List<Error> Errors;

    public BOIRRecords getBOIRReports() {
        return BOIRRecords;
    }

    public void setBOIRReports(BOIRRecords BOIRRecords) {
        this.BOIRRecords = BOIRRecords;
    }

    public String getStatusName() {
        return StatusName;
    }

    public void setStatusName(String statusName) {
        StatusName = statusName;
    }

    public Integer getStatusCode() {
        return StatusCode;
    }

    public void setStatusCode(Integer statusCode) {
        StatusCode = statusCode;
    }

    public String getStatusMessage() {
        return StatusMessage;
    }

    public void setStatusMessage(String statusMessage) {
        StatusMessage = statusMessage;
    }

    public String getReportNumber() {
        return ReportNumber;
    }

    public void setReportNumber(String reportNumber) {
        ReportNumber = reportNumber;
    }

    public String getReportType() {
        return ReportType;
    }

    public void setReportType(String reportType) {
        ReportType = reportType;
    }

    public String getReportStatus() {
        return ReportStatus;
    }

    public void setReportStatus(String reportStatus) {
        ReportStatus = reportStatus;
    }

    public List<Error> getErrors() {
        return Errors;
    }

    public void setErrors(List<Error> errors) {
        Errors = errors;
    }
}
