package com.formw2.sdk.enums;

import com.formw2.sdk.enums.model.EnumModel;

import java.util.ArrayList;

public class PayFreqEnum {
    public static final EnumModel MONTHLY = new EnumModel("Monthly", "Monthly");
    public static final EnumModel SEMI_WEEKLY = new EnumModel("SemiWeekly", "SemiWeekly");
    public static final EnumModel QUARTERLY = new EnumModel("Quarterly", "Quarterly");

    public static ArrayList<EnumModel> getPayFreq() {
        return new ArrayList<>() {
            {
                add(MONTHLY);
                add(SEMI_WEEKLY);
                add(QUARTERLY);
            }
        };
    }

}
