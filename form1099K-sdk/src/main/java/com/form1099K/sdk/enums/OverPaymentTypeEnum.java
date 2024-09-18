package com.form1099K.sdk.enums;

import com.form1099K.sdk.enums.model.EnumModel;

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
