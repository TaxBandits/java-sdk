package com.form1099NEC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class SuccessRecord {

    @JsonProperty("AccountNum")
    private String AccountNum;
    @JsonProperty("FederalReturn")
    private FederalReturn FederalReturn;
    @JsonProperty("OnlineAccess")
    private OnlineAccess OnlineAccess;
    @JsonProperty("Postal")
    private Postal Postal;
    @JsonProperty("RecipientId")
    private String RecipientId;
    @JsonProperty("RecordId")
    private String RecordId;
    @JsonProperty("SequenceId")
    private String SequenceId;
    @JsonProperty("StateReturns")
    private List<StateReturn> StateReturns;

    public String getAccountNum() {
        return AccountNum;
    }

    public void setAccountNum(String accountNum) {
        AccountNum = accountNum;
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

    public String getRecipientId() {
        return RecipientId;
    }

    public void setRecipientId(String recipientId) {
        RecipientId = recipientId;
    }

    public String getRecordId() {
        return RecordId;
    }

    public void setRecordId(String recordId) {
        RecordId = recordId;
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
