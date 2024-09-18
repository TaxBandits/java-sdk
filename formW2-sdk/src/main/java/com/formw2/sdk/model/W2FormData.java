
package com.formw2.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class W2FormData {

    @JsonProperty("B10DependtCareBenefits")
    private Long B10DependtCareBenefits;
    @JsonProperty("B11NonSec457Plan")
    private Long B11NonSec457Plan;
    @JsonProperty("B11Sec457Plan")
    private Long B11Sec457Plan;
    @JsonProperty("B12aAmt")
    private Long B12aAmt;
    @JsonProperty("B12aCd")
    private String B12aCd;
    @JsonProperty("B12bAmt")
    private Long B12bAmt;
    @JsonProperty("B12bCd")
    private String B12bCd;
    @JsonProperty("B12cAmt")
    private Long B12cAmt;
    @JsonProperty("B12cCd")
    private String B12cCd;
    @JsonProperty("B12dAmt")
    private Long B12dAmt;
    @JsonProperty("B12dCd")
    private String B12dCd;
    @JsonProperty("B13Is3rdPartySickPay")
    private Boolean B13Is3rdPartySickPay;
    @JsonProperty("B13IsRetPlan")
    private Boolean B13IsRetPlan;
    @JsonProperty("B13IsStatEmp")
    private Boolean B13IsStatEmp;
    @JsonProperty("B14Other")
    private String B14Other;
    @JsonProperty("B1Wages")
    private Double B1Wages;
    @JsonProperty("B2FedTaxWH")
    private Double B2FedTaxWH;
    @JsonProperty("B3SocSecWages")
    private Double B3SocSecWages;
    @JsonProperty("B4SocSecTaxWH")
    private Double B4SocSecTaxWH;
    @JsonProperty("B5MediWages")
    private Double B5MediWages;
    @JsonProperty("B6MediTaxWH")
    private Double B6MediTaxWH;
    @JsonProperty("B7SocSecTips")
    private Long B7SocSecTips;
    @JsonProperty("B8AllocatedTips")
    private Long B8AllocatedTips;
    @JsonProperty("ControlNum")
    private String ControlNum;
    @JsonProperty("States")
    private List<State> States;

    public Long getB10DependtCareBenefits() {
        return B10DependtCareBenefits;
    }

    public void setB10DependtCareBenefits(Long b10DependtCareBenefits) {
        B10DependtCareBenefits = b10DependtCareBenefits;
    }

    public Long getB11NonSec457Plan() {
        return B11NonSec457Plan;
    }

    public void setB11NonSec457Plan(Long b11NonSec457Plan) {
        B11NonSec457Plan = b11NonSec457Plan;
    }

    public Long getB11Sec457Plan() {
        return B11Sec457Plan;
    }

    public void setB11Sec457Plan(Long b11Sec457Plan) {
        B11Sec457Plan = b11Sec457Plan;
    }

    public Long getB12aAmt() {
        return B12aAmt;
    }

    public void setB12aAmt(Long b12aAmt) {
        B12aAmt = b12aAmt;
    }

    public String getB12aCd() {
        return B12aCd;
    }

    public void setB12aCd(String b12aCd) {
        B12aCd = b12aCd;
    }

    public Long getB12bAmt() {
        return B12bAmt;
    }

    public void setB12bAmt(Long b12bAmt) {
        B12bAmt = b12bAmt;
    }

    public String getB12bCd() {
        return B12bCd;
    }

    public void setB12bCd(String b12bCd) {
        B12bCd = b12bCd;
    }

    public Long getB12cAmt() {
        return B12cAmt;
    }

    public void setB12cAmt(Long b12cAmt) {
        B12cAmt = b12cAmt;
    }

    public String getB12cCd() {
        return B12cCd;
    }

    public void setB12cCd(String b12cCd) {
        B12cCd = b12cCd;
    }

    public Long getB12dAmt() {
        return B12dAmt;
    }

    public void setB12dAmt(Long b12dAmt) {
        B12dAmt = b12dAmt;
    }

    public String getB12dCd() {
        return B12dCd;
    }

    public void setB12dCd(String b12dCd) {
        B12dCd = b12dCd;
    }

    public Boolean getB13Is3rdPartySickPay() {
        return B13Is3rdPartySickPay;
    }

    public void setB13Is3rdPartySickPay(Boolean b13Is3rdPartySickPay) {
        B13Is3rdPartySickPay = b13Is3rdPartySickPay;
    }

    public Boolean getB13IsRetPlan() {
        return B13IsRetPlan;
    }

    public void setB13IsRetPlan(Boolean b13IsRetPlan) {
        B13IsRetPlan = b13IsRetPlan;
    }

    public Boolean getB13IsStatEmp() {
        return B13IsStatEmp;
    }

    public void setB13IsStatEmp(Boolean b13IsStatEmp) {
        B13IsStatEmp = b13IsStatEmp;
    }

    public String getB14Other() {
        return B14Other;
    }

    public void setB14Other(String b14Other) {
        B14Other = b14Other;
    }

    public Double getB1Wages() {
        return B1Wages;
    }

    public void setB1Wages(Double b1Wages) {
        B1Wages = b1Wages;
    }

    public Double getB2FedTaxWH() {
        return B2FedTaxWH;
    }

    public void setB2FedTaxWH(Double b2FedTaxWH) {
        B2FedTaxWH = b2FedTaxWH;
    }

    public Double getB3SocSecWages() {
        return B3SocSecWages;
    }

    public void setB3SocSecWages(Double b3SocSecWages) {
        B3SocSecWages = b3SocSecWages;
    }

    public Double getB4SocSecTaxWH() {
        return B4SocSecTaxWH;
    }

    public void setB4SocSecTaxWH(Double b4SocSecTaxWH) {
        B4SocSecTaxWH = b4SocSecTaxWH;
    }

    public Double getB5MediWages() {
        return B5MediWages;
    }

    public void setB5MediWages(Double b5MediWages) {
        B5MediWages = b5MediWages;
    }

    public Double getB6MediTaxWH() {
        return B6MediTaxWH;
    }

    public void setB6MediTaxWH(Double b6MediTaxWH) {
        B6MediTaxWH = b6MediTaxWH;
    }

    public Long getB7SocSecTips() {
        return B7SocSecTips;
    }

    public void setB7SocSecTips(Long b7SocSecTips) {
        B7SocSecTips = b7SocSecTips;
    }

    public Long getB8AllocatedTips() {
        return B8AllocatedTips;
    }

    public void setB8AllocatedTips(Long b8AllocatedTips) {
        B8AllocatedTips = b8AllocatedTips;
    }

    public String getControlNum() {
        return ControlNum;
    }

    public void setControlNum(String controlNum) {
        ControlNum = controlNum;
    }

    public List<State> getStates() {
        return States;
    }

    public void setStates(List<State> states) {
        States = states;
    }
}
