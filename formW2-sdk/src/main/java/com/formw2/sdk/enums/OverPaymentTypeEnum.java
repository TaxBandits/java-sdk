package com.formw2.sdk.enums;

import com.formw2.sdk.enums.model.EnumModel;

import java.util.ArrayList;

public class OverPaymentTypeEnum {

    public static final EnumModel REFUND = new EnumModel("Refund", "Refund");
    public static final EnumModel CREDIT = new EnumModel("Credit", "Credit");

    public static ArrayList<EnumModel> getOverPaymentTypes() {
        return new ArrayList<>() {{
            add(REFUND);
            add(CREDIT);
        }};
    }

}
