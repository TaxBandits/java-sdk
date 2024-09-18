
package com.formw2.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AZ {

    @JsonProperty("FormA1R")
    private FormA1R FormA1R;

    public com.formw2.sdk.model.FormA1R getFormA1R() {
        return FormA1R;
    }

    public void setFormA1R(com.formw2.sdk.model.FormA1R formA1R) {
        FormA1R = formA1R;
    }

}
