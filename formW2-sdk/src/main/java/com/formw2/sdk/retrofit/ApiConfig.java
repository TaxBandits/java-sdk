package com.formw2.sdk.retrofit;

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

    //  FormW2 module endpoints
    public static final String FORM_W2_VALIDATE_FORM = "FormW2/ValidateForm";
    public static final String FORM_W2_CREATE = "FormW2/Create";
    public static final String FORM_W2_UPDATE = "FormW2/Update";
    public static final String FORM_W2_LIST = "FormW2/List";
    public static final String FORM_W2_STATUS = "FormW2/Status";
    public static final String FORM_W2_DELETE = "FormW2/Delete";
    public static final String FORM_W2_TRANSMIT = "FormW2/Transmit";
    public static final String FORM_W2_REQUEST_DRAFT_PDF_URL = "FormW2/RequestDraftPdfUrl";
    public static final String FORM_W2_REQUEST_PDF_URLS = "FormW2/RequestPdfURLs";
    public static final String FORM_W2_GET = "FormW2/Get";

}
