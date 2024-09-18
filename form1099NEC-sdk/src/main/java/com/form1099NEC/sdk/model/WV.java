package com.form1099NEC.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WV {

    @JsonProperty("FormIT103")
    private FormIT103 FormIT103;

    public FormIT103 getFormIT103() {
        return FormIT103;
    }

    public void setFormIT103(FormIT103 formIT103) {
        FormIT103 = formIT103;
    }
}
