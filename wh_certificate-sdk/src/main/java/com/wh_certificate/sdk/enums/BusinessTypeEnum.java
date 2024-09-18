package com.wh_certificate.sdk.enums;

import com.wh_certificate.sdk.enums.model.EnumModel;

import java.util.ArrayList;

public class BusinessTypeEnum {

    public static final EnumModel ESTATE = new EnumModel("ESTE", "Estate");
    public static final EnumModel PARTNERSHIP = new EnumModel("PART", "Partnership");
    public static final EnumModel CORPORATION = new EnumModel("CORP", "Corporation");
    public static final EnumModel EXEMPT_ORGANIZATION = new EnumModel("EORG", "Exempt Organization");
    public static final EnumModel SOLE_PROPRIETORSHIP = new EnumModel("SPRO", "Sole Proprietorship");

    public static ArrayList<EnumModel> getBusinessTypes() {
        return new ArrayList<>() {{
            add(ESTATE);
            add(PARTNERSHIP);
            add(CORPORATION);
            add(EXEMPT_ORGANIZATION);
            add(SOLE_PROPRIETORSHIP);
        }};
    }

}
