package com.form1099K.sdk.enums;

import com.form1099K.sdk.enums.model.EnumModel;

import java.util.ArrayList;

public class AccountTypesEnum {

    public static final EnumModel CHECKING = new EnumModel("Checking", "Checking");
    public static final EnumModel SAVING = new EnumModel("Saving", "Saving");

    public static ArrayList<EnumModel> getAccountTypes() {
        return new ArrayList<>() {{
            add(CHECKING);
            add(SAVING);
        }};
    }

}
