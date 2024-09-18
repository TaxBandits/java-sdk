package com.form1099MISC.sdk.retrofit;

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

    //  Business module endpoints
    public static final String BUSINESS_CREATE = "Business/Create";
    public static final String BUSINESS_LIST = "Business/List";

    //  Form1099MISC module endpoints
    public static final String FORM1099MISC_VALIDATE_FORM = "Form1099MISC/ValidateForm";
    public static final String FORM1099MISC_CREATE = "Form1099MISC/Create";
    public static final String FORM1099MISC_UPDATE = "Form1099MISC/Update";
    public static final String FORM1099MISC_LIST = "Form1099MISC/List";
    public static final String FORM1099MISC_STATUS = "Form1099MISC/Status";
    public static final String FORM1099MISC_DELETE = "Form1099MISC/Delete";
    public static final String FORM1099MISC_TRANSMIT = "Form1099MISC/Transmit";
    public static final String FORM1099MISC_REQUEST_DRAFT_PDF_URL = "Form1099MISC/RequestDraftPdfUrl";
    public static final String FORM1099MISC_REQUEST_PDF_URLS = "Form1099MISC/RequestPdfURLs";
    public static final String FORM1099MISC_GET = "Form1099MISC/Get";

}
