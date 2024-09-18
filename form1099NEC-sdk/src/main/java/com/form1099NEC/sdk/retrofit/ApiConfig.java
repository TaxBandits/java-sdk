package com.form1099NEC.sdk.retrofit;

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

    //  Form1099NEC module endpoints
    public static final String FORM1099NEC_VALIDATE_FORM = "Form1099NEC/ValidateForm";
    public static final String FORM1099NEC_CREATE = "Form1099NEC/Create";
    public static final String FORM1099NEC_UPDATE = "Form1099NEC/Update";
    public static final String FORM1099NEC_LIST = "Form1099NEC/List";
    public static final String FORM1099NEC_STATUS = "Form1099NEC/Status";
    public static final String FORM1099NEC_DELETE = "Form1099NEC/Delete";
    public static final String FORM1099NEC_TRANSMIT = "Form1099NEC/Transmit";
    public static final String FORM1099NEC_REQUEST_DRAFT_PDF_URL = "Form1099NEC/RequestDraftPdfUrl";
    public static final String FORM1099NEC_REQUEST_PDF_URLS = "Form1099NEC/RequestPdfURLs";
    public static final String FORM1099NEC_GET = "Form1099NEC/Get";

}
