package com.formw2.sdk.enums;

import com.formw2.sdk.enums.model.EnumModel;

import java.util.ArrayList;

public class FilingSchTypeEnum {

    public static final EnumModel QUARTERLY = new EnumModel("Quarterly", "Quarterly");
    public static final EnumModel MONTHLY = new EnumModel("Monthly", "Monthly");
    public static final EnumModel SEMI_MONTHLY = new EnumModel("SemiMonthly", "SemiMonthly");
    public static final EnumModel QUAD_MONTHLY = new EnumModel("QuadMonthly", "QuadMonthly");
    public static final EnumModel ANNUAL = new EnumModel("Annual", "Annual");

    public static ArrayList<EnumModel> getFilingSchTypes() {
        return new ArrayList<>() {
            {
                add(QUARTERLY);
                add(MONTHLY);
                add(SEMI_MONTHLY);
                add(QUAD_MONTHLY);
                add(ANNUAL);
            }
        };
    }

}
