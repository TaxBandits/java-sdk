package com.wh_certificate.sdk.model;

import com.google.gson.annotations.SerializedName;

public class Customization {

    @SerializedName("BusinessLogoUrl")
    private String BusinessLogoUrl;

    public String getBusinessLogoUrl() {
        return BusinessLogoUrl;
    }

    public void setBusinessLogoUrl(String businessLogoUrl) {
        BusinessLogoUrl = businessLogoUrl;
    }
}
