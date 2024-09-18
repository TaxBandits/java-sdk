package com.business.sdk.enums;

import com.business.sdk.enums.model.EnumModel;

import java.util.ArrayList;

public class SuffixEnum {

    public static final EnumModel JR_SUFFIX = new EnumModel("Jr", "Jr");
    public static final EnumModel SR_SUFFIX = new EnumModel("Sr", "Sr");
    public static final EnumModel I_SUFFIX = new EnumModel("I", "I");
    public static final EnumModel II_SUFFIX = new EnumModel("II", "II");
    public static final EnumModel III_SUFFIX = new EnumModel("III", "III");
    public static final EnumModel IV_SUFFIX = new EnumModel("IV", "IV");
    public static final EnumModel V_SUFFIX = new EnumModel("V", "V");
    public static final EnumModel VI_SUFFIX = new EnumModel("VI", "VI");
    public static final EnumModel VII_SUFFIX = new EnumModel("VII", "VII");

    public static ArrayList<EnumModel> getSuffixes() {
        return new ArrayList<>() {{
            add(JR_SUFFIX);
            add(SR_SUFFIX);
            add(I_SUFFIX);
            add(II_SUFFIX);
            add(III_SUFFIX);
            add(IV_SUFFIX);
            add(V_SUFFIX);
            add(VI_SUFFIX);
            add(VII_SUFFIX);
        }};
    }

}
