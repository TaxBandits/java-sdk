package com.boir.sdk.enums;

import com.boir.sdk.enums.model.EnumModel;

import java.util.ArrayList;

public class DocumentTypeEnum {
    public static final EnumModel VALUE1 = new EnumModel("Driving_License", "State issued driver's license");
    public static final EnumModel VALUE2 = new EnumModel("State/local/tribe_Issued_ID", "State/local/tribe-issued ID");
    public static final EnumModel VALUE3 = new EnumModel("U.S.Passport", "U.S Passport");
    public static final EnumModel VALUE4 = new EnumModel("Foreign_Passport", "Foreign Passport");

    public static ArrayList<EnumModel> getDocumentTypes() {
        return new ArrayList<>() {{
            add(VALUE1);
            add(VALUE2);
            add(VALUE3);
            add(VALUE4);
        }};
    }

}
