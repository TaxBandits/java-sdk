package com.form1099MISC.sdk.retrofit;

import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class HeaderInterceptor implements Interceptor {

    private final HashMap<String, String> headers;

    public HeaderInterceptor(HashMap<String, String> headers) {
        this.headers = headers;
    }

    // We can pass header values to interceptors
    @NotNull
    @Override
    public Response intercept(@NotNull Chain chain) throws IOException {
        Request.Builder request = chain.request().newBuilder();
        for (Map.Entry<String, String> header : headers.entrySet()) {
            request.header(header.getKey(), header.getValue());
        }
        return chain.proceed(request.build());
    }

}
