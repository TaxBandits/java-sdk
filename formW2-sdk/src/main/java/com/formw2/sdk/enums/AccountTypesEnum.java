package com.formw2.sdk.enums;

import com.formw2.sdk.enums.model.EnumModel;

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
