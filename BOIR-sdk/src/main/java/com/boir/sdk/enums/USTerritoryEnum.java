package com.boir.sdk.enums;

import com.boir.sdk.enums.model.EnumModel;

import java.util.ArrayList;

public class USTerritoryEnum {

    public static final EnumModel AMERICAN_SAMOA = new EnumModel("AS", "American Samoa (AS)");
    public static final EnumModel GUAM = new EnumModel("GU", "Guam (GU)");
    public static final EnumModel MARSHALL_ISLANDS = new EnumModel("MH", "Marshall Islands (MH)");
    public static final EnumModel MICRONESIA_FEDERATED_STATES = new EnumModel("FM", "Micronesia, Federated States (FM)");
    public static final EnumModel NORTHERN_MARIANA_ISLANDS = new EnumModel("MP", "Northern Mariana Islands (MP)");
    public static final EnumModel PALAU = new EnumModel("PW", "Palau (PW)");
    public static final EnumModel PUERTO_RICO = new EnumModel("PR", "Puerto Rico (PR)");
    public static final EnumModel U_S_VIRGIN_ISLANDS = new EnumModel("VI", "U.S. Virgin Islands (VI)");

    public static ArrayList<EnumModel> getUSTerritories() {
        return new ArrayList<>() {{
            add(AMERICAN_SAMOA);
            add(GUAM);
            add(MARSHALL_ISLANDS);
            add(MICRONESIA_FEDERATED_STATES);
            add(NORTHERN_MARIANA_ISLANDS);
            add(PALAU);
            add(PUERTO_RICO);
            add(U_S_VIRGIN_ISLANDS);
        }};
    }

}
