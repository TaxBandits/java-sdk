package com.tin.sdk.retrofit;

public class RetrofitResponse<V> {

    private int code;
    private String message;

    private V data;

    public RetrofitResponse() {
    }

    public RetrofitResponse(int code, String message, V data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public V getData() {
        return data;
    }

    public void setData(V data) {
        this.data = data;
    }
}
