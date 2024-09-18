package com.wh_certificate.sdk.model;

public class RequestByUrlRequest {

    private Customization Customization;
    private Recipient Recipient;
    private RedirectUrls RedirectUrls;
    private Requester Requester;

    public Customization getCustomization() {
        return Customization;
    }

    public void setCustomization(Customization customization) {
        Customization = customization;
    }

    public Recipient getRecipient() {
        return Recipient;
    }

    public void setRecipient(Recipient recipient) {
        Recipient = recipient;
    }

    public RedirectUrls getRedirectUrls() {
        return RedirectUrls;
    }

    public void setRedirectUrls(RedirectUrls redirectUrls) {
        RedirectUrls = redirectUrls;
    }

    public Requester getRequester() {
        return Requester;
    }

    public void setRequester(Requester requester) {
        Requester = requester;
    }
}
