# TaxBandits Business API SDK using JAVA

TaxBandits Form W9 SDK is written in JAVA, used to communicate with the TaxBandits API.

## Cloning and Running the Application in local

- Clone the project into your local machine.
   ```bash
   git clone https://github.com/SPAN-Enterprises/TaxBandits-SDK.git
   ```
- Let's Navigate into the sdk-java &rarr; business-sdk folder.

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

- java.com.formW9.sdk
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

The below libraries are used to build the Business SDK.

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
- **TBS_PUBLIC_API_BASE_URL** - TaxBandits base URL to request the API Method as Business.
- **TBS_API_CONSOLE_CLIENT_ID** - It is passed as input for generating JWT token.
- **TBS_API_CONSOLE_USER_TOKEN** - It is passed as input for generating JWT token.
- **TBS_API_CONSOLE_CLIENT_SECRET_KEY** - It is passed as input for generating JWT token.

> Note : You can get your own ClientId, Secret key and User Token from our TaxBandits Console Site and add it to
> the `ApiConfig.java` class file in the
> path `com.busines.sdk.retrofit`. [Goto TaxBandits Console Site](https://sandbox.taxbandits.com/)

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

#### 'FormW9' module endpoints

Used to List, RequestByEmail, RequestByUrl and Get the FormW9.

```
  - FormW9/List
  - FormW9/RequestByEmail
  - FormW9/RequestByUrl
  - FormW9/Get
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

### Get Business Create

```https
  POST /Business/Create
```

**Sandbox**

```jsx
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

### Get Business List

```https
  GET  /Business/List
```

**Sandbox**

```jsx
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

### Get FormW9 List

```https
  GET  /FormW9/List
```

**Sandbox**

```jsx
  https://testapi.taxbandits.com/{version}/FormW9/List
```

##### Request:

| Header Param    | Type   | Description                                                 |
|:----------------|:-------|:------------------------------------------------------------|
| `Authorization` | String | **Required**, This is AccessToken for data access from API. |

| Query Param  | Type   | Description                          |
|:-------------|:-------|:-------------------------------------|
| `BusinessId` | String | A unique identifier of the business. |
| `Page`       | Long   | List as starting from.               |
| `PageSize`   | Long   | The size of Business.                |

##### Response:

| Response Body  | Type | Description                 |
|:---------------|:-----|:----------------------------|
| `FormW9Record` | List | We can getting FormW9 list. |

### RequestByEmail of FormW9

```https
  GET  /FormW9/RequestByEmail
```

**Sandbox**

```jsx
  https://testapi.taxbandits.com/{version}/FormW9/RequestByEmail
```

##### Request:

| Header Param    | Type   | Description                                                 |
|:----------------|:-------|:------------------------------------------------------------|
| `Authorization` | String | **Required**, This is AccessToken for data access from API. |

| Request Body            | Type  | Description                                                                                                               |
|:------------------------|:------|:--------------------------------------------------------------------------------------------------------------------------|
| `RequestByEmailRequest` | Model | **Required**, Pass BusinessId and recipient’s name and email address. W-9 email requests will be triggered to recipients. |

##### Response:

| Response Body            | Type  | Description                                                          |
|:-------------------------|:------|:---------------------------------------------------------------------|
| `RequestByEmailResponse` | Model | A unique url via email to the recipients to complete their form W-9. |

### RequestByUrl of FormW9

```https
  GET  /FormW9/RequestByUrl
```

**Sandbox**

```jsx
  https://testapi.taxbandits.com/{version}/FormW9/RequestByUrl
```

##### Request:

| Header Param    | Type   | Description                                                 |
|:----------------|:-------|:------------------------------------------------------------|
| `Authorization` | String | **Required**, This is AccessToken for data access from API. |

| Request Body          | Type  | Description                                                |
|:----------------------|:------|:-----------------------------------------------------------|
| `RequestByUrlRequest` | Model | **Required**, Request W-9 URL using Payee Reference alone. |

##### Response:

| Response Body          | Type  | Description                                                        |
|:-----------------------|:------|:-------------------------------------------------------------------|
| `RequestByUrlResponse` | Model | Distinctive URL is generated for specific PayeeRef and BusinessID. |

### Get of FormW9

```https
  GET  /FormW9/Get
```

**Sandbox**

```jsx
  https://testapi.taxbandits.com/{version}/FormW9/Get
```

##### Request:

| Header Param    | Type   | Description                                                 |
|:----------------|:-------|:------------------------------------------------------------|
| `Authorization` | String | **Required**, This is AccessToken for data access from API. |

| Query Param | Type   | Description                                                             |
|:------------|:-------|:------------------------------------------------------------------------|
| `PayeeRef`  | String | **Required**, The given Payee Reference corresponding to the BusinessId |

##### Response:

| Response Body       | Type  | Description                                 |
|:--------------------|:------|:--------------------------------------------|
| `FormW9GetResponse` | Model | The response will have the W-9 information. |

> In the above URLs, `{version}` is the endpoint version of TaxBandits API.

For more information, please refer: https://developer.taxbandits.com/
