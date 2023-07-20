# Using the TaxBandits API with JAVA

-> TaxBandits SDK is written in JAVA, used to communicate with the TaxBandits API.

### Developer Terms

-> You agree to comply with all applicable laws and regulations and also agree to our
Terms http://www.expresstaxzone.com/terms-of-use

-> By using the TaxBandits SDK you agree to these terms.

## Technical Requirements:

- **IDE:** [IntelliJ IDEA 2023.1.2 (Community Edition)](https://www.jetbrains.com/idea/download/?var=1&section=windows)
- **Server:** [Tomcat 10](https://tomcat.apache.org/download-10.cgi)
- **Framework:** Spring Boot
- **Pattern:** MVC
- **Language:** Java
- **JDK:** Version 17
- **REST client:** Retrofit
- **Repository :** GitHub

## App has the following packages:

- java.com.oauth.sdk
    - controller
        - model
    - model
    - retrofit
        - services
    - utils
- resources
    - static
        - css
        - fonts
        - images
        - js
    - templates

## Libraries

build.gradle(project)

- Thymeleaf is update the value into UI

``` dependencies
  implementation 'org.springframework boot:spring-boot-starter-thymeleaf'
```

- Spring boot Web Application

``` dependencies
  implementation 'org.springframework.boot:spring-boot-starter-web'
```

- JSON handler

``` dependencies
  implementation 'org.json:json:20230227'
```

- Java to JSON converter

``` dependencies
  implementation 'com.google.code.gson:gson:2.8.9'
```

- JWT access token creation

``` dependencies
  implementation 'io.jsonwebtoken:jjwt-api:0.11.2'
  implementation 'io.jsonwebtoken:jjwt-impl:0.11.2'
  implementation 'io.jsonwebtoken:jjwt-jackson:0.11.2'
```

- Retrofit

``` dependencies
  implementation 'com.squareup.retrofit2:retrofit:2.9.0'
  implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
```

- Print logs as during the Retrofit call

``` dependencies
  implementation 'com.squareup.okhttp3:logging-interceptor:5.0.0-alpha.11'
```

- Room DB

``` dependencies
  implementation 'androidx.room:room-runtime:2.4.3'
  kapt 'androidx.room:room-compiler:2.4.3'
```

- Web application server

``` dependencies
  implementation 'org.springframework.boot:spring-boot-starter-tomcat:3.1.0'
```

## API Reference

### Get AccessToken

``` https
  GET   /tbsauth
```

##### Request:

| Header Param     | Type   | Description                                                                                                                  |
|:-----------------|:-------|:-----------------------------------------------------------------------------------------------------------------------------|
| `Authentication` | String | **Required**, Generate *JwsToken* by given the API credentials are ClientId, ClientSecret and UserToken with HMAC algorithm. |

##### Response:

| Body Response | Type   | Description                                       |
|:--------------|:-------|:--------------------------------------------------|
| `AccessToken` | String | We can use future of API calls for Authorization. |

### Get Business List

``` https
  GET  Business/List
```

##### Request:

| Header Param    | Type   | Description                                                 |
|:----------------|:-------|:------------------------------------------------------------|
| `Authorization` | String | **Required**, This is AccessToken for data access from API. |

##### Response:

| Body Response | Type | Description                |
|:--------------|:-----|:---------------------------|
| `Businesses`  | List | We can getting businesses. |

## Screenshot

Oauth Reference![oauth_reference.png](src%2Fmain%2Fresources%2Fstatic%2Fimages%2Foauth_reference.png)

