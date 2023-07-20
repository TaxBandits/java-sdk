package com.tin.sdk.retrofit;

public class ApiConfig {

    //The following Client Id, User Token and Client Secret key will available in TBS Console Site.
    public static final String TBS_API_CONSOLE_CLIENT_ID = "Your Client Id here";
    public static final String TBS_API_CONSOLE_CLIENT_SECRET_KEY = "Your Client Secret Key here";
    public static final String TBS_API_CONSOLE_USER_TOKEN = "Your Client User token here";

    // API URLs for Sandbox
    public static final String TBS_PUBLIC_API_OAUTH = "https://testoauth.expressauth.net/v2/";
    public static final String TBS_PUBLIC_API_BASE_URL = "https://testapi.taxbandits.com/V1.7.3/";

    //  OAuth module endpoint
    public static final String TBS_AUTH = "tbsauth";

    //  Business module endpoints
    public static final String BUSINESS_CREATE = "Business/Create";
    public static final String BUSINESS_LIST = "Business/List";

    //  TINMatchingRecipients module endpoints
    public static final String TIN_MATCHING_RECIPIENTS_REQUEST = "TINMatchingRecipients/Request";
    public static final String TIN_MATCHING_RECIPIENTS_LIST = "TINMatchingRecipients/List";
    public static final String TIN_MATCHING_RECIPIENTS_STATUS = "TINMatchingRecipients/Status";
    public static final String TIN_MATCHING_RECIPIENTS_CANCEL_REQUEST = "TINMatchingRecipients/CancelRequest";
}
