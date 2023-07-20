package com.tin.sdk.utils;

public class StringUtils {

    /**
     * Check if the given string is a valid or not
     * Parameters: String inputString
     **/
    public static boolean isValidString(String inputString) {
        return inputString != null && !inputString.isEmpty() && inputString.trim().length() > 0 &&
                !inputString.trim().equalsIgnoreCase("null");
    }

}
