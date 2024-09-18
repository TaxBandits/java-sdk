package com.form1099K.sdk.enums;

import com.form1099K.sdk.enums.model.EnumModel;

import java.util.ArrayList;

public class PaymentMethodEnum {

    public static final EnumModel EFT_DEBIT = new EnumModel("EFT DEBIT", "EFT Debit");
    public static final EnumModel EFT_CREDIT = new EnumModel("EFT CREDIT", "EFT Credit");

    public static ArrayList<EnumModel> getPaymentMethods() {
        return new ArrayList<>() {{
            add(EFT_DEBIT);
            add(EFT_CREDIT);
        }};
    }

}
