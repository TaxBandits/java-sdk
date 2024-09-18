package com.formW9.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class RequestByEmailRequest {

    @JsonProperty("Recipients")
    private List<Recipient> Recipients;
    @JsonProperty("Requester")
    private Requester Requester;
    @JsonProperty("SubmissionManifest")
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
