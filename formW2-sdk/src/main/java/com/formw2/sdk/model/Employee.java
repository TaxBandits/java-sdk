
package com.formw2.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Employee {

    @JsonProperty("EmployeeId")
    private String EmployeeId;
    @JsonProperty("EmployeeName")
    private String EmployeeName;
    @JsonProperty("FederalReturn")
    private FederalReturn FederalReturn;
    @JsonProperty("OnlineAccess")
    private OnlineAccess OnlineAccess;
    @JsonProperty("Postal")
    private Postal Postal;
    @JsonProperty("RecordId")
    private String RecordId;
    @JsonProperty("SSN")
    private String SSN;
    @JsonProperty("IsEIN")
    private boolean IsEIN;
    @JsonProperty("SequenceId")
    private String SequenceId;
    @JsonProperty("StateReturns")
    private List<StateReturn> StateReturns;

    public String getEmployeeId() {
        return EmployeeId;
    }

    public void setEmployeeId(String employeeId) {
        EmployeeId = employeeId;
    }

    public String getEmployeeName() {
        return EmployeeName;
    }

    public void setEmployeeName(String employeeName) {
        EmployeeName = employeeName;
    }

    public FederalReturn getFederalReturn() {
        return FederalReturn;
    }

    public void setFederalReturn(FederalReturn federalReturn) {
        FederalReturn = federalReturn;
    }

    public OnlineAccess getOnlineAccess() {
        return OnlineAccess;
    }

    public void setOnlineAccess(OnlineAccess onlineAccess) {
        OnlineAccess = onlineAccess;
    }

    public Postal getPostal() {
        return Postal;
    }

    public void setPostal(Postal postal) {
        Postal = postal;
    }

    public String getRecordId() {
        return RecordId;
    }

    public void setRecordId(String recordId) {
        RecordId = recordId;
    }

    public String getSSN() {
        return SSN;
    }

    public void setSSN(String SSN) {
        this.SSN = SSN;
    }

    public boolean isEIN() {
        return IsEIN;
    }

    public void setEIN(boolean EIN) {
        IsEIN = EIN;
    }

    public String getSequenceId() {
        return SequenceId;
    }

    public void setSequenceId(String sequenceId) {
        SequenceId = sequenceId;
    }

    public List<StateReturn> getStateReturns() {
        return StateReturns;
    }

    public void setStateReturns(List<StateReturn> stateReturns) {
        StateReturns = stateReturns;
    }
}
