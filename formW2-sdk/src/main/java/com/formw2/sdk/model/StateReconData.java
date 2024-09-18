package com.formw2.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StateReconData {

    //  For Form1099Nec list response
    @JsonProperty("AL")
    private AL AL;

    @JsonProperty("AZ")
    private AZ AZ;

    @JsonProperty("WV")
    private WV WV;

    public AL getAL() {
        return AL;
    }

    public void setAL(AL AL) {
        this.AL = AL;
    }

    public AZ getAZ() {
        return AZ;
    }

    public void setAZ(AZ AZ) {
        this.AZ = AZ;
    }

    public WV getWV() {
        return WV;
    }

    public void setWV(WV WV) {
        this.WV = WV;
    }
}
