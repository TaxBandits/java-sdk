package com.form1099K.sdk.model;

import java.util.List;

public class Recipient {

    private FederalReturn FederalReturn;
    private OnlineAccess OnlineAccess;
    private Postal Postal;
    private ScheduleFiling ScheduleFiling;
    private String RecipientId;
    private String RecipientNm;
    private String FirstNm;
    private String MiddleNm;
    private String LastNm;
    private String Suffix;
    private String RecordId;
    private String SequenceId;
    private List<StateReturn> StateReturns;
    private String TIN;
    private String TINType;

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

    public ScheduleFiling getScheduleFiling() {
        return ScheduleFiling;
    }

    public void setScheduleFiling(ScheduleFiling scheduleFiling) {
        ScheduleFiling = scheduleFiling;
    }

    public String getRecipientId() {
        return RecipientId;
    }

    public void setRecipientId(String recipientId) {
        RecipientId = recipientId;
    }

    public String getRecipientNm() {
        return RecipientNm;
    }

    public void setRecipientNm(String recipientNm) {
        RecipientNm = recipientNm;
    }

    public String getFirstNm() {
        return FirstNm;
    }

    public void setFirstNm(String firstNm) {
        FirstNm = firstNm;
    }

    public String getMiddleNm() {
        return MiddleNm;
    }

    public void setMiddleNm(String middleNm) {
        MiddleNm = middleNm;
    }

    public String getLastNm() {
        return LastNm;
    }

    public void setLastNm(String lastNm) {
        LastNm = lastNm;
    }

    public String getSuffix() {
        return Suffix;
    }

    public void setSuffix(String suffix) {
        Suffix = suffix;
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

    public String getTIN() {
        return TIN;
    }

    public void setTIN(String TIN) {
        this.TIN = TIN;
    }

    public String getTINType() {
        return TINType;
    }

    public void setTINType(String TINType) {
        this.TINType = TINType;
    }
}
