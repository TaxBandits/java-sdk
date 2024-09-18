package com.wh_certificate.sdk.model;

import com.google.gson.annotations.SerializedName;

public class RedirectUrls {

    @SerializedName("CancelUrl")
    private String CancelUrl;
    @SerializedName("ReturnUrl")
    private String ReturnUrl;

    public String getCancelUrl() {
        return CancelUrl;
    }

    public void setCancelUrl(String cancelUrl) {
        CancelUrl = cancelUrl;
    }

    public String getReturnUrl() {
        return ReturnUrl;
    }

    public void setReturnUrl(String returnUrl) {
        ReturnUrl = returnUrl;
    }
}
