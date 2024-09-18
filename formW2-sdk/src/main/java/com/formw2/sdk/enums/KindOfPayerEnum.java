package com.formw2.sdk.enums;

import com.formw2.sdk.enums.model.EnumModel;

import java.util.ArrayList;

public class KindOfPayerEnum {

    public static final EnumModel REGULAR941 = new EnumModel("REGULAR941", "Regular941");
    public static final EnumModel REGULAR944 = new EnumModel("REGULAR944", "Regular944");
    public static final EnumModel AGRICULTURAL943 = new EnumModel("AGRICULTURAL943", "Agricultural943");
    public static final EnumModel HOUSEHOLD = new EnumModel("HOUSEHOLD", "House Hold");
    public static final EnumModel MILITARY = new EnumModel("MILITARY", "Military");
    public static final EnumModel MEDICARE_QUAL_GOV_EM = new EnumModel("MEDICAREQUALGOVEM", "Medical Care Quality Govt EM");
    public static final EnumModel RAIL_ROAD_FORM_CT1 = new EnumModel("RAILROADFORMCT1", "Railroad Form CT-1");

    public static ArrayList<EnumModel> getKindOfKindOfPayers() {
        return new ArrayList<>() {{
            add(REGULAR941);
            add(REGULAR944);
            add(AGRICULTURAL943);
            add(HOUSEHOLD);
            add(MILITARY);
            add(MEDICARE_QUAL_GOV_EM);
            add(RAIL_ROAD_FORM_CT1);
        }};
    }

}
