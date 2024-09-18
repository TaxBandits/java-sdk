package com.form1099MISC.sdk.enums;

import com.form1099MISC.sdk.enums.model.EnumModel;

import java.util.ArrayList;

public class KindOfEmployerEnum {

    public static final EnumModel FEDERAL_GOVT = new EnumModel("FEDERALGOVT", "Federl Govt");
    public static final EnumModel STATE_OR_LOCAL_501C = new EnumModel("STATEORLOCAL501C", "State Or Local501C");
    public static final EnumModel NON_GOVT_501C = new EnumModel("NONGOVT501C", "Non Govt 501C");
    public static final EnumModel STATE_OR_LOCAL_NON_501C = new EnumModel("STATEORLOCALNON501C", "State Or Local Non 501C");
    public static final EnumModel NONE_APPLY = new EnumModel("NONEAPPLY", "None Apply");

    public static ArrayList<EnumModel> getKindOfEmployers() {
        return new ArrayList<>() {{
            add(FEDERAL_GOVT);
            add(STATE_OR_LOCAL_501C);
            add(NON_GOVT_501C);
            add(STATE_OR_LOCAL_NON_501C);
            add(NONE_APPLY);
        }};
    }

}
