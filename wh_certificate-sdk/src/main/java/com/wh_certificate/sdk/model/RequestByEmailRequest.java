package com.wh_certificate.sdk.model;

import java.util.List;

public class RequestByEmailRequest {

    private List<Recipient> Recipients;
    private Requester Requester;
    private SubmissionManifest SubmissionManifest;
    private String WebhookRef;

    public List<Recipient> getRecipients() {
        return Recipients;
    }

    public void setRecipients(List<Recipient> recipients) {
        Recipients = recipients;
    }

    public Requester getRequester() {
        return Requester;
    }

    public void setRequester(Requester requester) {
        Requester = requester;
    }

    public SubmissionManifest getSubmissionManifest() {
        return SubmissionManifest;
    }

    public void setSubmissionManifest(SubmissionManifest submissionManifest) {
        SubmissionManifest = submissionManifest;
    }

    public String getWebhookRef() {
        return WebhookRef;
    }

    public void setWebhookRef(String webhookRef) {
        WebhookRef = webhookRef;
    }
}
