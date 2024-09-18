package com.formw2.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AL {

    @JsonProperty("FormA3")
    private ReconFormA3 FormA3;

    public ReconFormA3 getFormA3() {
        return FormA3;
    }

    public void setFormA3(ReconFormA3 formA3) {
        FormA3 = formA3;
    }

}
