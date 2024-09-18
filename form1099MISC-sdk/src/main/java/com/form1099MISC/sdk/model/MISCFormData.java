
package com.form1099MISC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class MISCFormData {

    @JsonProperty("AccountNum")
    private String AccountNum;
    @JsonProperty("B10GrossProceeds")
    private Long B10GrossProceeds;
    @JsonProperty("B11FishPurForResale")
    private Long B11FishPurForResale;
    @JsonProperty("B12Sec409ADeferrals")
    private Long B12Sec409ADeferrals;
    @JsonProperty("B13IsFATCA")
    private Boolean B13IsFATCA;
    @JsonProperty("B14EPP")
    private String B14EPP;
    @JsonProperty("B15NonQualDefComp")
    private String B15NonQualDefComp;
    @JsonProperty("B1Rents")
    private String B1Rents;
    @JsonProperty("B2Royalties")
    private String B2Royalties;
    @JsonProperty("B3OtherIncome")
    private String B3OtherIncome;
    @JsonProperty("B4FedIncomeTaxWH")
    private String B4FedIncomeTaxWH;
    @JsonProperty("B5FishingBoatProceeds")
    private Long B5FishingBoatProceeds;
    @JsonProperty("B6MedHealthcarePymts")
    private Long B6MedHealthcarePymts;
    @JsonProperty("B7IsDirectSale")
    private Boolean B7IsDirectSale;
    @JsonProperty("B8SubstitutePymts")
    private Long B8SubstitutePymts;
    @JsonProperty("B9CropInsurance")
    private Long B9CropInsurance;
    @JsonProperty("Is2ndTINnot")
    private Boolean Is2ndTINnot;
    @JsonProperty("States")
    private List<State> States;

    public String getAccountNum() {
        return AccountNum;
    }

    public void setAccountNum(String accountNum) {
        AccountNum = accountNum;
    }

    public Long getB10GrossProceeds() {
        return B10GrossProceeds;
    }

    public void setB10GrossProceeds(Long b10GrossProceeds) {
        B10GrossProceeds = b10GrossProceeds;
    }

    public Long getB11FishPurForResale() {
        return B11FishPurForResale;
    }

    public void setB11FishPurForResale(Long b11FishPurForResale) {
        B11FishPurForResale = b11FishPurForResale;
    }

    public Long getB12Sec409ADeferrals() {
        return B12Sec409ADeferrals;
    }

    public void setB12Sec409ADeferrals(Long b12Sec409ADeferrals) {
        B12Sec409ADeferrals = b12Sec409ADeferrals;
    }

    public Boolean getB13IsFATCA() {
        return B13IsFATCA;
    }

    public void setB13IsFATCA(Boolean b13IsFATCA) {
        B13IsFATCA = b13IsFATCA;
    }

    public String getB14EPP() {
        return B14EPP;
    }

    public void setB14EPP(String b14EPP) {
        B14EPP = b14EPP;
    }

    public String getB15NonQualDefComp() {
        return B15NonQualDefComp;
    }

    public void setB15NonQualDefComp(String b15NonQualDefComp) {
        B15NonQualDefComp = b15NonQualDefComp;
    }

    public String getB1Rents() {
        return B1Rents;
    }

    public void setB1Rents(String b1Rents) {
        B1Rents = b1Rents;
    }

    public String getB2Royalties() {
        return B2Royalties;
    }

    public void setB2Royalties(String b2Royalties) {
        B2Royalties = b2Royalties;
    }

    public String getB3OtherIncome() {
        return B3OtherIncome;
    }

    public void setB3OtherIncome(String b3OtherIncome) {
        B3OtherIncome = b3OtherIncome;
    }

    public String getB4FedIncomeTaxWH() {
        return B4FedIncomeTaxWH;
    }

    public void setB4FedIncomeTaxWH(String b4FedIncomeTaxWH) {
        B4FedIncomeTaxWH = b4FedIncomeTaxWH;
    }

    public Long getB5FishingBoatProceeds() {
        return B5FishingBoatProceeds;
    }

    public void setB5FishingBoatProceeds(Long b5FishingBoatProceeds) {
        B5FishingBoatProceeds = b5FishingBoatProceeds;
    }

    public Long getB6MedHealthcarePymts() {
        return B6MedHealthcarePymts;
    }

    public void setB6MedHealthcarePymts(Long b6MedHealthcarePymts) {
        B6MedHealthcarePymts = b6MedHealthcarePymts;
    }

    public Boolean getB7IsDirectSale() {
        return B7IsDirectSale;
    }

    public void setB7IsDirectSale(Boolean b7IsDirectSale) {
        B7IsDirectSale = b7IsDirectSale;
    }

    public Long getB8SubstitutePymts() {
        return B8SubstitutePymts;
    }

    public void setB8SubstitutePymts(Long b8SubstitutePymts) {
        B8SubstitutePymts = b8SubstitutePymts;
    }

    public Long getB9CropInsurance() {
        return B9CropInsurance;
    }

    public void setB9CropInsurance(Long b9CropInsurance) {
        B9CropInsurance = b9CropInsurance;
    }

    public Boolean getIs2ndTINnot() {
        return Is2ndTINnot;
    }

    public void setIs2ndTINnot(Boolean is2ndTINnot) {
        Is2ndTINnot = is2ndTINnot;
    }

    public List<State> getStates() {
        return States;
    }

    public void setStates(List<State> states) {
        States = states;
    }
}
