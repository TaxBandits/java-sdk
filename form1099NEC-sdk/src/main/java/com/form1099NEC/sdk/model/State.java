package com.form1099NEC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class State {

    @JsonProperty("StateCd")
    private String StateCd;
    @JsonProperty("StateIdNum")
    private String StateIdNum;
    @JsonProperty("StateIncome")
    private Long StateIncome;
    @JsonProperty("StateWH")
    private String StateWH;

    public String getStateCd() {
        return StateCd;
    }

    public void setStateCd(String stateCd) {
        StateCd = stateCd;
    }

    public String getStateIdNum() {
        return StateIdNum;
    }

    public void setStateIdNum(String stateIdNum) {
        StateIdNum = stateIdNum;
    }

    public Long getStateIncome() {
        return StateIncome;
    }

    public void setStateIncome(Long stateIncome) {
        StateIncome = stateIncome;
    }

    public String getStateWH() {
        return StateWH;
    }

    public void setStateWH(String stateWH) {
        StateWH = stateWH;
    }
}
