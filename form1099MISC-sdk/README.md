# TaxBandits Form1099MISC API SDK using JAVA

TaxBandits Form1099MISC SDK is written in JAVA, used to communicate with the TaxBandits API.

## Introduction

In this SDK, we demonstrate how to ValidateForm, Create, Update, List, Status, Delete, Transmit, RequestPdf, and
RequestDraftPdfUrl of Form1099MISC using TaxBandits API. Here we use HTML and Javascript as frontend and Java as backend.

## Cloning and Running the Application in local

- Clone the project into your local machine.
   ```bash
   git clone https://github.com/SPAN-Enterprises/TaxBandits-SDK.git
   ```
- Let's Navigate into the sdk-java &rarr; form1099MISC-sdk folder.

## Technical Requirements:

Business SDK is developed using the below,

- **IDE:** [IntelliJ IDEA 2023.1.2 (Community Edition)](https://www.jetbrains.com/idea/download/?var=1&section=windows)
- **Server:** [Tomcat 10](https://tomcat.apache.org/download-10.cgi)
- **Framework:** Spring Boot
- **Pattern:** MVC
- **Language:** Java
- **JDK:** Version 17
- **REST client:** Retrofit
- **Repository :** GitHub

## Project Structure:

- java.com.form1099MISC.sdk
    - controller
        - model
        - rest_controller
    - enums
        - model
    - model
    - retrofit
        - services
    - utils
- resources
    - static
        - images
        - js
        - styles
            - css
                - icons-mdi
            - fonts
    - templates

## Libraries Used:

The below libraries are used to build the Form1099MISC SDK.

build.gradle(project)

- Thymeleaf is update the value into UI

``` 
  implementation 'org.springframework boot:spring-boot-starter-thymeleaf'
```

- Spring boot Web Application

```
  implementation 'org.springframework.boot:spring-boot-starter-web'
```

- JSON handler

``` 
  implementation 'org.json:json:20230227'
```

- Java to JSON converter

```
  implementation 'com.google.code.gson:gson:2.8.9'
```

- JWT access token creation

```
  implementation 'io.jsonwebtoken:jjwt-api:0.11.2'
  implementation 'io.jsonwebtoken:jjwt-impl:0.11.2'
  implementation 'io.jsonwebtoken:jjwt-jackson:0.11.2'
```

- Retrofit

```
  implementation 'com.squareup.retrofit2:retrofit:2.9.0'
  implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
```

- Print logs as during the Retrofit call

```
  implementation 'com.squareup.okhttp3:okhttp'
  implementation 'com.squareup.okhttp3:logging-interceptor'
```

- Web application server

```
  implementation 'org.springframework.boot:spring-boot-starter-tomcat:3.1.0'
```

## API Config:

- **TBS_PUBLIC_API_OAUTH** - Authentication Server URL that we used to generate JWT token.
- **TBS_PUBLIC_API_BASE_URL** - Authentication Server URL that we used for Create, List and Update Business.
- **TBS_API_CONSOLE_CLIENT_ID** - It is passed as input for generating JWT token.
- **AWS_ACCESS_KEY_ID** - AWS account Credentials passed as input for decrypting pdf URL.
- **AWS_SECRET_KEY_ID** - AWS account Credentials passed as input for decrypting pdf URL.
- **BUCKET_NAME** - It is passed as input for decrypting pdf URL.
- **AWS_ENCRYPTION_KEY** - It is passed as input for decrypting pdf URL.
- **TBS_API_CONSOLE_USER_TOKEN** - It is passed as input for generating JWT token.
- **TBS_API_CONSOLE_CLIENT_SECRET_KEY** - It is passed as input for generating JWT token.

> Note : You can get your own ClientId, Secret key and User Token from our TaxBandits Console Site and add it to
> the `ApiConfig.java` class file in the
> path `com.form1099MISC.sdk.retrofit`. [Goto TaxBandits Console Site](https://sandbox.taxbandits.com/)

### API Reference

- All the endpoints used in this SDK are mentioned below,

> Note: You can find the endpoints in an `ApiConfig.java` class file in the path `com.business.sdk.retrofit`

#### 'OAuth' Module endpoint

Used to generate the JWT using the JWS.

``` 
    - tbsauth
```

#### 'Business' module endpoints

Used to create and List the Businesses.

```
    - Business/Create
    - Business/List
```

### To Get AccessToken

``` https
    GET /tbsauth
    https://testoauth.expressauth.net/v2/tbsauth
```

##### Request:

| Header Param     | Type   | Description                                                                                                                  |
|:-----------------|:-------|:-----------------------------------------------------------------------------------------------------------------------------|
| `Authentication` | String | **Required**, Generate *JwsToken* by given the API credentials are ClientId, ClientSecret and UserToken with HMAC algorithm. |

##### Response:

| Body Response | Type   | Description                                       |
|:--------------|:-------|:--------------------------------------------------|
| `AccessToken` | String | We can use future of API calls for Authorization. |

### Create Business

For creating business, pass the required data from Html and JavaScript Application (Frontend) to the Java Application(
Backend). In Backend, JWT will be generated and passed to the TBS Create Business Endpoint in headers as Authorization.
By requesting the TBS Create Business Endpoint, the business will be created and output will be shown in a modal.

```https
    POST /Business/Create
```

**TBS Public API Base URL:**

```
    https://testapi.taxbandits.com/{version}/Business/Create
```

##### Request:

| Header Param    | Type   | Description                                                 |
|:----------------|:-------|:------------------------------------------------------------|
| `Authorization` | String | **Required**, This is AccessToken for data access from API. |

| Request Body            | Type        | Description  |
|:------------------------|:------------|:-------------|
| `CreateBusinessRequest` | Model class | **Required** |

##### Response:

| Response Body            | Type        | Description                             |
|:-------------------------|:------------|:----------------------------------------|
| `CreateBusinessResponse` | Model class | We can getting details of the business. |

### List Business

For listing business we are passing page, page size, FromDate as params which is taken from env files and ToDate is
taken as current date which is also passed as params and JWT token as headers. By passing these values we request to TBS
Public API Base URL.
After requesting list method in business API we'll display the response data as a list.

- If there is no business under the User, it shows the response from the list method in Business TBS Public API Base
  URL.
  #### Sample No Business found
    ```json
    {
        "StatusCode": 404,
        "StatusName": "NotFound",
        "StatusMessage": "The resource you have specified cannot be found",
        "Businesses": null,
        "Page": 1,
        "TotalRecords": 0,
        "TotalPages": 0,
        "PageSize": 10,
        "Errors": null
    }

```https
  GET  /Business/List
```

**TBS Public API Base URL:**

```
    https://testapi.taxbandits.com/{version}/Business/List
```

##### Request:

| Header Param    | Type   | Description                                                 |
|:----------------|:-------|:------------------------------------------------------------|
| `Authorization` | String | **Required**, This is AccessToken for data access from API. |

| Query Param | Type | Description            |
|:------------|:-----|:-----------------------|
| `Page`      | Long | List as starting from. |
| `PageSize`  | Long | The size of Business.  |

##### Response:

| Response Body | Type | Description                |
|:--------------|:-----|:---------------------------|
| `Businesses`  | List | We can getting businesses. |

### Validate Form1099-MISC

It checks the request's 1099-MISC Forms to IRS business standards and field specifications before creating Form1099MISC.
For validating Form1099MISC, pass the recipient and Form1099MISC data as input along with Access Token in the header as
Bearer Token (Generated using TaxBandits OAuth authentication API). After requesting validateForm method in Form1099MISC
API, the response will be shown in a modal.

```https
    POST  /Form1099MISC/ValidateForm
```

**TBS Public API Base URL:**

```
    https://testapi.taxbandits.com/{version}/Form1099MISC/ValidateForm
```

##### Request:

| Header Param    | Type   | Description                                                 |
|:----------------|:-------|:------------------------------------------------------------|
| `Authorization` | String | **Required**, This is AccessToken for data access from API. |

| Request Body                | Type        | Description  |
|:----------------------------|:------------|:-------------|
| `CreateForm1099MiscRequest` | Model class | **Required** |

##### Response:

| Response Body                | Type        | Description                                          |
|:-----------------------------|:------------|:-----------------------------------------------------|
| `CreateForm1099MiscResponse` | Model class | We can getting details of the validate Form1099MISC. |

### Create Form1099-MISC

For creating Form1099-MISC, pass the recipient and Form1099MISC data as input along with Access Token in the header as
Bearer Token (Generated using TaxBandits OAuth authentication API) against businessId. After requesting create method in
Form1099MISC API, the response will be shown in a modal.

```https
  POST  /Form1099MISC/Create
```

**TBS Public API Base URL:**

```
    https://testapi.taxbandits.com/{version}/Form1099MISC/Create
```

##### Request:

| Header Param    | Type   | Description                                                 |
|:----------------|:-------|:------------------------------------------------------------|
| `Authorization` | String | **Required**, This is AccessToken for data access from API. |

| Request Body                | Type        | Description  |
|:----------------------------|:------------|:-------------|
| `CreateForm1099MiscRequest` | Model class | **Required** |

##### Response:

| Response Body                | Type        | Description                                                                                                                                                 |
|:-----------------------------|:------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CreateForm1099MiscResponse` | Model class | Form 1099-MISC returns created successfully. A unique SubmissionId is created which is further used as a reference for all other methods of Form 1099 MISC. |

### Update Form1099-MISC

For updating Form1099-MISC we are requesting get Form1099-MISC method from Form1099MISC API and fetch the data against
SubmissionId and RecordId which is passed as query. After retrieving data we'll update it by requesting TBS Public API
Base URL.

After requesting update method in Form1099MISC API, output will be shown in a modal and navigated to listForm1099MISC
page.

```https
    POST  /Form1099MISC/Update
```

**TBS Public API Base URL:**

```
    https://testapi.taxbandits.com/{version}/Form1099MISC/Update
```

##### Request:

| Header Param    | Type   | Description                                                 |
|:----------------|:-------|:------------------------------------------------------------|
| `Authorization` | String | **Required**, This is AccessToken for data access from API. |

| Request Body                | Type        | Description  |
|:----------------------------|:------------|:-------------|
| `CreateForm1099MiscRequest` | Model class | **Required** |

##### Response:

| Response Body                | Type        | Description                                                      |
|:-----------------------------|:------------|:-----------------------------------------------------------------|
| `CreateForm1099MiscResponse` | Model class | Response will update the new data with the existing information. |

### List Form1099-MISC

For listing Form1099-MISC, BusinessId is passed as query parameter along with Access Token in the header as Bearer
Token (Generated using TaxBandits OAuth authentication API).
After requesting list method in Form1099-MISC, the response is shown as a table.

```https
    GET  /Form1099MISC/List
```

**TBS Public API Base URL:**

```
    https://testapi.taxbandits.com/{version}/Form1099MISC/List
```

##### Request:

| Header Param    | Type   | Description                                                 |
|:----------------|:-------|:------------------------------------------------------------|
| `Authorization` | String | **Required**, This is AccessToken for data access from API. |

| Query Param  | Type | Description                                                           |
|:-------------|:-----|:----------------------------------------------------------------------|
| `BusinessId` | Long | List all the 1099-MISC returns created for the particular BusinessId. |
| `Page`       | Long | List as starting from.                                                |
| `PageSize`   | Long | The size of Business.                                                 |

##### Response:

| Response Body              | Type | Description                                                                      |
|:---------------------------|:-----|:---------------------------------------------------------------------------------|
| `FormMisc1099ListResponse` | List | The Response Payload will list all the returns created for the given BusinessId. |

### Form1099-MISC Status

For displaying Form1099-MISC Status, pass the SubmissionId and RecordId as query along with Access Token in the header as
Bearer Token (Generated using TaxBandits OAuth authentication API).
After requesting status method in Form1099MISC API, the response will be shown in a modal.

```https
    GET  /Form1099MISC/Status
```

**TBS Public API Base URL:**

```
    https://testapi.taxbandits.com/{version}/Form1099MISC/Status
```

##### Request:

| Header Param    | Type   | Description                                                 |
|:----------------|:-------|:------------------------------------------------------------|
| `Authorization` | String | **Required**, This is AccessToken for data access from API. |

| Query Param    | Type   | Description                                                                                     |
|:---------------|:-------|:------------------------------------------------------------------------------------------------|
| `SubmissionId` | String | Specify the SubmissionId and RecordId for the status that needs to be retrieved for the return. |

##### Response:

| Response Body                | Type        | Description                                                               |
|:-----------------------------|:------------|:--------------------------------------------------------------------------|
| `StatusForm1099MiscResponse` | Model class | Response will display the status of both state filing and federal filing. |

### Delete Form1099-MISC

For deleting TIN Matching Recipients, pass the SubmissionId and RecordId as query along with Access Token in the header
as Bearer Token (Generated using TaxBandits OAuth authentication API). Delete method in Form1099MISC API shows success
response only if requested Form1099MISC is in not transmitted status else it will show error response. By passing these
values we request to TBS Public API Base URL.
After requesting delete method in Form1099MISC API, the response will be shown in a modal.

```https
    DELETE  /Form1099MISC/Delete
```

**TBS Public API Base URL:**

```
    https://testapi.taxbandits.com/{version}/Form1099MISC/Delete
```

##### Request:

| Header Param    | Type   | Description                                                 |
|:----------------|:-------|:------------------------------------------------------------|
| `Authorization` | String | **Required**, This is AccessToken for data access from API. |

| Query Param    | Type         | Description                                                   |
|:---------------|:-------------|:--------------------------------------------------------------|
| `SubmissionId` | String       | An existing form 1099-MISC return for the given SubmissionId. |
| `RecordIds`    | String Array | An existing form 1099-MISC return for the given RecordIds.    |

##### Response:

| Response Body    | Type        | Description                                                                                   |
|:-----------------|:------------|:----------------------------------------------------------------------------------------------|
| `DeleteResponse` | Model class | Based on the SubmissionId, the response will delete the returns under the specified RecordId. |

### Transmit Form1099-MISC

For transmitting Form1099-MISC, pass the SubmissionId and RecordId as query along with Access Token in the header as
Bearer Token (Generated using TaxBandits OAuth authentication API). Transmit method in Form1099MISC API shows error
response for already transmitted forms. By passing these values we request to TBS Public API Base URL.
After requesting transmit method in Form1099MISC API, the response will be shown in a modal.

```https
    POST  /Form1099MISC/Transmit
```

**TBS Public API Base URL:**

```
    https://testapi.taxbandits.com/{version}/Form1099MISC/Transmit
```

##### Request:

| Header Param    | Type   | Description                                                 |
|:----------------|:-------|:------------------------------------------------------------|
| `Authorization` | String | **Required**, This is AccessToken for data access from API. |

| Request Body      | Type        | Description                                                                   |
|:------------------|:------------|:------------------------------------------------------------------------------|
| `TransmitRequest` | Model class | Give the SubmissionId and RecordId for the return that has to be transmitted. |

##### Response:

| Response Body      | Type        | Description                                                                                   |
|:-------------------|:------------|:----------------------------------------------------------------------------------------------|
| `TransmitResponse` | Model class | Based on the SubmissionId, the response will delete the returns under the specified RecordId. |

### RequestDraftPdfUrl Form1099-MISC

For requestingDraftPdfUrl of Form1099-MISC, pass the RecordId as request body along with Access Token in the header as
Bearer Token (Generated using TaxBandits OAuth authentication API). requestDraftPdfUrl method in Form1099MISC API shows
success response only for not transmitted forms else it shows error response. By passing these values we request to TBS
Public API Base URL.
After requesting requestingDraftPdfUrl method in Form1099MISC API, the response pdf url will be decrypted and pdf is
shown
in a modal.

```https
    POST  /Form1099MISC/RequestDraftPdfUrl
```

**TBS Public API Base URL:**

```
    https://testapi.taxbandits.com/{version}/Form1099MISC/RequestDraftPdfUrl
```

##### Request:

| Header Param    | Type   | Description                                                 |
|:----------------|:-------|:------------------------------------------------------------|
| `Authorization` | String | **Required**, This is AccessToken for data access from API. |

| Request Body                | Type        | Description                                      |
|:----------------------------|:------------|:-------------------------------------------------|
| `RequestDraftPdfUrlRequest` | Model class | To generate Draft PdfUrl With just the RecordId. |

##### Response:

| Response Body                | Type        | Description                                               |
|:-----------------------------|:------------|:----------------------------------------------------------|
| `RequestDraftPdfUrlResponse` | Model class | Draft PdfUrl will be generated for the given RecipientId. |

### RequestPdfUrls Form1099-MISC

For requestingPdfUrl of Form1099-MISC, pass the SubmissionId and RecordId as request body along with Access Token in the
header as Bearer Token (Generated using TaxBandits OAuth authentication API). requestPdfUrl method in Form1099MISC API
shows success response only for transmitted forms else it shows error response. By passing these values we request to
TBS Public API Base URL.
After requesting requestPdfUrl method in Form1099MISC API, the response pdf urls will be shown in a table and by choosing
anyone url ,it will be decrypted and shown as pdf in a modal.

```https
    POST  /Form1099MISC/RequestPdfURLs
```

**TBS Public API Base URL:**

```
    https://testapi.taxbandits.com/{version}/Form1099MISC/RequestPdfURLs
```

##### Request:

| Header Param    | Type   | Description                                                 |
|:----------------|:-------|:------------------------------------------------------------|
| `Authorization` | String | **Required**, This is AccessToken for data access from API. |

| Request Body            | Type        | Description                             |
|:------------------------|:------------|:----------------------------------------|
| `RequestPdfURLsRequest` | Model class | Request PDF URL for the given RecordId. |

##### Response:

| Response Body            | Type        | Description                                           |
|:-------------------------|:------------|:------------------------------------------------------|
| `RequestPdfURLsResponse` | Model class | Pdf Url will be generated for the given SubmissionId. |

> In the above URLs, `{version}` is the endpoint version of TaxBandits API.

For more information, please refer: https://developer.taxbandits.com/
