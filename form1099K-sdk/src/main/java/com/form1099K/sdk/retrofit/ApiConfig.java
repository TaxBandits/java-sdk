package com.form1099K.sdk.retrofit;

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

    //  Form1099K module endpoints
    public static final String FORM1099K_VALIDATE_FORM = "Form1099K/ValidateForm";
    public static final String FORM1099K_CREATE = "Form1099K/Create";
    public static final String FORM1099K_UPDATE = "Form1099K/Update";
    public static final String FORM1099K_LIST = "Form1099K/List";
    public static final String FORM1099K_STATUS = "Form1099K/Status";
    public static final String FORM1099K_DELETE = "Form1099K/Delete";
    public static final String FORM1099K_TRANSMIT = "Form1099K/Transmit";
    public static final String FORM1099K_REQUEST_DRAFT_PDF_URL = "Form1099K/RequestDraftPdfUrl";
    public static final String FORM1099K_REQUEST_PDF_URLS = "Form1099K/RequestPdfURLs";
    public static final String FORM1099K_GET = "Form1099K/Get";

}
