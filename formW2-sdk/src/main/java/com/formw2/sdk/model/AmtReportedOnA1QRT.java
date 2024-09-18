
package com.formw2.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AmtReportedOnA1QRT {

    @JsonProperty("Qtr1st")
    private String Qtr1st;
    @JsonProperty("Qtr2nd")
    private String Qtr2nd;
    @JsonProperty("Qtr3rd")
    private String Qtr3rd;
    @JsonProperty("Qtr4th")
    private String Qtr4th;
    @JsonProperty("TotReported")
    private Long TotReported;

    public String getQtr1st() {
        return Qtr1st;
    }

    public void setQtr1st(String qtr1st) {
        Qtr1st = qtr1st;
    }

    public String getQtr2nd() {
        return Qtr2nd;
    }

    public void setQtr2nd(String qtr2nd) {
        Qtr2nd = qtr2nd;
    }

    public String getQtr3rd() {
        return Qtr3rd;
    }

    public void setQtr3rd(String qtr3rd) {
        Qtr3rd = qtr3rd;
    }

    public String getQtr4th() {
        return Qtr4th;
    }

    public void setQtr4th(String qtr4th) {
        Qtr4th = qtr4th;
    }

    public Long getTotReported() {
        return TotReported;
    }

    public void setTotReported(Long totReported) {
        TotReported = totReported;
    }
}
