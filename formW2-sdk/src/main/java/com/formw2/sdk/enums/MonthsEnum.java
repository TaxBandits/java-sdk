package com.formw2.sdk.enums;

import com.formw2.sdk.enums.model.EnumModel;

import java.util.ArrayList;

public class MonthsEnum {
    public static final EnumModel JAN = new EnumModel("JAN", "Jan");
    public static final EnumModel FEB = new EnumModel("FEB", "Feb");
    public static final EnumModel MAR = new EnumModel("MAR", "Mar");
    public static final EnumModel APR = new EnumModel("APR", "Apr");
    public static final EnumModel MAY = new EnumModel("MAY", "May");
    public static final EnumModel JUN = new EnumModel("JUN", "Jun");
    public static final EnumModel JUL = new EnumModel("JUL", "Jul");
    public static final EnumModel AUG = new EnumModel("AUG", "Aug");
    public static final EnumModel SEP = new EnumModel("SEP", "Sep");
    public static final EnumModel OCT = new EnumModel("OCT", "Oct");
    public static final EnumModel NOV = new EnumModel("NOV", "Nov");
    public static final EnumModel DEC = new EnumModel("DEC", "Dec");

    public static ArrayList<EnumModel> getMonths() {
        return new ArrayList<>() {
            {
                add(JAN);
                add(FEB);
                add(MAR);
                add(APR);
                add(MAY);
                add(JUN);
                add(JUL);
                add(AUG);
                add(SEP);
                add(OCT);
                add(NOV);
                add(DEC);
            }
        };
    }
}
