package com.formW9.sdk.retrofit;

import com.formW9.sdk.utils.QuickTags;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import java.util.HashMap;

public class RetrofitService {

    private final Retrofit.Builder builder;

    private Retrofit retrofit;

    private final OkHttpClient.Builder httpClient = new OkHttpClient.Builder();

    private final HttpLoggingInterceptor loggingInterceptor = new HttpLoggingInterceptor()
            .setLevel(HttpLoggingInterceptor.Level.BODY);

    public RetrofitService(boolean isAuth) {
        String BASIC_URL = (isAuth ? ApiConfig.TBS_PUBLIC_API_OAUTH : ApiConfig.TBS_PUBLIC_API_BASE_URL);
        builder = new Retrofit.Builder()
                .baseUrl(BASIC_URL)
                .addConverterFactory(GsonConverterFactory.create());
    }

    // API services
    public <R> R createService(Class<R> serviceClass, HashMap<String, String> headers) {
        if (!httpClient.interceptors().contains(loggingInterceptor)) {
            httpClient.interceptors().clear();
            httpClient.addInterceptor(new HeaderInterceptor(headers));
            httpClient.addInterceptor(loggingInterceptor);
            builder.client(httpClient.build());
            retrofit = builder.build();
        }
        return retrofit.create(serviceClass);
    }

    // OAuth API service
    public <R> R createService(Class<R> serviceClass, final String token) {
        if (token != null) {
            httpClient.interceptors().clear();
            httpClient.addInterceptor(chain -> {
                Request original = chain.request();
                Request.Builder requestBuilder = original.newBuilder()
                        .header(QuickTags.AUTHENTICATION, token);
                Request request = requestBuilder.build();
                return chain.proceed(request);
            });
            builder.client(httpClient.build());
            httpClient.addInterceptor(loggingInterceptor);
            retrofit = builder.build();
        }
        return retrofit.create(serviceClass);
    }

}
