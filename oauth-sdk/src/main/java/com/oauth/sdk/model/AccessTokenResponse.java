package com.oauth.sdk.model;

public class AccessTokenResponse {

    private String AccessToken;

    private String PartnerUserAccessToken;

    private String TbsRedirectUri;

    private Error Errors;

    private Long ExpiresIn;

    private Long StatusCode;

    private String StatusMessage;

    private String StatusName;

    private String TokenType;

    public String getPartnerUserAccessToken() {
        return PartnerUserAccessToken;
    }

    public void setPartnerUserAccessToken(String partnerUserAccessToken) {
        PartnerUserAccessToken = partnerUserAccessToken;
    }

    public String getTbsRedirectUri() {
        return TbsRedirectUri;
    }

    public void setTbsRedirectUri(String tbsRedirectUri) {
        TbsRedirectUri = tbsRedirectUri;
    }

    public String getAccessToken() {
        return AccessToken;
    }

    public void setAccessToken(String accessToken) {
        AccessToken = accessToken;
    }

    public Object getErrors() {
        return Errors;
    }

    public void setErrors(Error errors) {
        Errors = errors;
    }

    public Long getExpiresIn() {
        return ExpiresIn;
    }

    public void setExpiresIn(Long expiresIn) {
        ExpiresIn = expiresIn;
    }

    public Long getStatusCode() {
        return StatusCode;
    }

    public void setStatusCode(Long statusCode) {
        StatusCode = statusCode;
    }

    public String getStatusMessage() {
        return StatusMessage;
    }

    public void setStatusMessage(String statusMessage) {
        StatusMessage = statusMessage;
    }

    public String getStatusName() {
        return StatusName;
    }

    public void setStatusName(String statusName) {
        StatusName = statusName;
    }

    public String getTokenType() {
        return TokenType;
    }

    public void setTokenType(String tokenType) {
        TokenType = tokenType;
    }
}
