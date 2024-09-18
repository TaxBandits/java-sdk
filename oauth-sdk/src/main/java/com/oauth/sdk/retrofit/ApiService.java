package com.oauth.sdk.retrofit;

import com.oauth.sdk.model.BusinessListResponse;
import com.oauth.sdk.model.CreateBusinessRequest;
import com.oauth.sdk.model.CreateBusinessResponse;
import org.springframework.web.bind.annotation.RequestBody;
import retrofit2.Call;
import retrofit2.http.GET;

public interface ApiService {

    @GET(ApiConfig.BASE_URL + ApiConfig.BUSINESS_LIST)
    Call<BusinessListResponse> businessList();

    @GET(ApiConfig.BASE_URL + ApiConfig.BUSINESS_CREATE)
    Call<CreateBusinessResponse> createBusiness(@RequestBody CreateBusinessRequest request);

}
