package com.boir.sdk.retrofit;

public class ApiConfig {

    // The following Client Id, User Token and Client Secret key will available in TBS Console Site.
    public static final String TBS_API_CONSOLE_CLIENT_ID = "Your Client Id here";
    public static final String TBS_API_CONSOLE_CLIENT_SECRET_KEY = "Your Client Secret Key here";
    public static final String TBS_API_CONSOLE_USER_TOKEN = "Your User Token here";

    // API URLs for Sandbox
    public static final String TBS_PUBLIC_API_OAUTH = "https://testoauth.expressauth.net/v2/";
    public static final String TBS_PUBLIC_API_BASE_URL = "https://testapi.taxbandits.com/V1.7.3/";

    //  AWS Keys
    public static final String BUCKET_NAME = "<<Bucket Name>>";  //AWS Bucket Name provided by TaxBandits in Console Site
    public static final String BASE64_KEY = "<<Base64Key>>";  //AWS Base64 Key provided by TaxBandits in Console Site
    public static final String AMAZON_S3_PATH = "https://expressirsforms.s3.us-east-1.amazonaws.com/";
    public static final String AWS_ACCESS_KEY = "<<AWS AccessKey>>";  //AWS Access Key provided by TaxBandits in Console Site
    public static final String AWS_SECRET_KEY = "<<AWS SecretKey>>";  //AWS Secret Key provided by TaxBandits in Console Site

    //  OAuth module endpoint
    public static final String TBS_AUTH = "tbsauth";

    //  Ping API endpoint
    public static final String UTILITY_PING = "Utility/Ping";

    //  Business module endpoints
    public static final String BUSINESS_CREATE = "BOIR/Create";
    public static final String BUSINESS_LIST = "Business/List";

    //  BOIR Reporting
    public static final String BOIR_CREATE = "BOIR/Create";
    public static final String BOIR_GET = "BOIR/Get";

}