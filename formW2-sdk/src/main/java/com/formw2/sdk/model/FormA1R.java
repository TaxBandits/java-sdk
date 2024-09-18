
package com.formw2.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FormA1R {

    @JsonProperty("AZWithHoldingID")
    private Long AZWithHoldingID;
    @JsonProperty("AmtReportedOnA1QRT")
    private AmtReportedOnA1QRT AmtReportedOnA1QRT;
    @JsonProperty("IsAmtDiff")
    private String IsAmtDiff;
    @JsonProperty("IsCancelDueToMrge")
    private String IsCancelDueToMrge;
    @JsonProperty("IsEarlyReturn")
    private String IsEarlyReturn;
    @JsonProperty("Penalty")
    private Long Penalty;
    @JsonProperty("PrevErDetails")
    private PrevErDetails PrevErDetails;
    @JsonProperty("TotNumOfEmp")
    private Long TotNumOfEmp;
    @JsonProperty("TotNumOfForms")
    private Long TotNumOfForms;
    @JsonProperty("TotTaxWH")
    private Long TotTaxWH;
    @JsonProperty("TotWages")
    private Long TotWages;

    public Long getAZWithHoldingID() {
        return AZWithHoldingID;
    }

    public void setAZWithHoldingID(Long AZWithHoldingID) {
        this.AZWithHoldingID = AZWithHoldingID;
    }

    public com.formw2.sdk.model.AmtReportedOnA1QRT getAmtReportedOnA1QRT() {
        return AmtReportedOnA1QRT;
    }

    public void setAmtReportedOnA1QRT(com.formw2.sdk.model.AmtReportedOnA1QRT amtReportedOnA1QRT) {
        AmtReportedOnA1QRT = amtReportedOnA1QRT;
    }

    public String getIsAmtDiff() {
        return IsAmtDiff;
    }

    public void setIsAmtDiff(String isAmtDiff) {
        IsAmtDiff = isAmtDiff;
    }

    public String getIsCancelDueToMrge() {
        return IsCancelDueToMrge;
    }

    public void setIsCancelDueToMrge(String isCancelDueToMrge) {
        IsCancelDueToMrge = isCancelDueToMrge;
    }

    public String getIsEarlyReturn() {
        return IsEarlyReturn;
    }

    public void setIsEarlyReturn(String isEarlyReturn) {
        IsEarlyReturn = isEarlyReturn;
    }

    public Long getPenalty() {
        return Penalty;
    }

    public void setPenalty(Long penalty) {
        Penalty = penalty;
    }

    public com.formw2.sdk.model.PrevErDetails getPrevErDetails() {
        return PrevErDetails;
    }

    public void setPrevErDetails(com.formw2.sdk.model.PrevErDetails prevErDetails) {
        PrevErDetails = prevErDetails;
    }

    public Long getTotNumOfEmp() {
        return TotNumOfEmp;
    }

    public void setTotNumOfEmp(Long totNumOfEmp) {
        TotNumOfEmp = totNumOfEmp;
    }

    public Long getTotNumOfForms() {
        return TotNumOfForms;
    }

    public void setTotNumOfForms(Long totNumOfForms) {
        TotNumOfForms = totNumOfForms;
    }

    public Long getTotTaxWH() {
        return TotTaxWH;
    }

    public void setTotTaxWH(Long totTaxWH) {
        TotTaxWH = totTaxWH;
    }

    public Long getTotWages() {
        return TotWages;
    }

    public void setTotWages(Long totWages) {
        TotWages = totWages;
    }
}
