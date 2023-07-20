# TaxBandits Business API SDK using JAVA

TaxBandits Business SDK is written in JAVA, used to communicate with the TaxBandits API.

## Cloning and Running the Application in local

- Clone the project into your local machine.
   ```bash
   git clone https://github.com/TaxBandits/java-sdk.git
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

- java.com.business.sdk
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
https://testapi.taxbandits.com/v1.7.3/Business/Create
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
  https://testapi.taxbandits.com/v1.7.3/Business/List
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

For more information, please refer: https://developer.taxbandits.com/
