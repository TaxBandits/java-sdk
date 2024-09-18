package com.boir.sdk.retrofit;

import okhttp3.OkHttpClient;
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
            if (headers != null)
                httpClient.addInterceptor(new HeaderInterceptor(headers));
            httpClient.addInterceptor(loggingInterceptor);
            builder.client(httpClient.build());
            retrofit = builder.build();
        }
        return retrofit.create(serviceClass);
    }

}
