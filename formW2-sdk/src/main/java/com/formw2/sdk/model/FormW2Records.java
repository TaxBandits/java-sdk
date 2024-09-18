
package com.formw2.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FormW2Records {

    @JsonProperty("BusinessId")
    private String BusinessId;
    @JsonProperty("BusinessNm")
    private String BusinessNm;
    @JsonProperty("ContactName")
    private String ContactName;
    @JsonProperty("EIN")
    private String EIN;
    @JsonProperty("Employee")
    private Employee Employee;
    @JsonProperty("PayerRef")
    private String PayerRef;
    @JsonProperty("SubmissionId")
    private String SubmissionId;
    @JsonProperty("TaxYear")
    private String TaxYear;

    public String getBusinessId() {
        return BusinessId;
    }

    public void setBusinessId(String businessId) {
        BusinessId = businessId;
    }

    public String getBusinessNm() {
        return BusinessNm;
    }

    public void setBusinessNm(String businessNm) {
        BusinessNm = businessNm;
    }

    public String getContactName() {
        return ContactName;
    }

    public void setContactName(String contactName) {
        ContactName = contactName;
    }

    public String getEIN() {
        return EIN;
    }

    public void setEIN(String EIN) {
        this.EIN = EIN;
    }

    public Employee getEmployee() {
        return Employee;
    }

    public void setEmployee(Employee employee) {
        Employee = employee;
    }

    public String getPayerRef() {
        return PayerRef;
    }

    public void setPayerRef(String payerRef) {
        PayerRef = payerRef;
    }

    public String getSubmissionId() {
        return SubmissionId;
    }

    public void setSubmissionId(String submissionId) {
        SubmissionId = submissionId;
    }

    public String getTaxYear() {
        return TaxYear;
    }

    public void setTaxYear(String taxYear) {
        TaxYear = taxYear;
    }
}
