package com.tin.sdk.model;

import com.google.gson.annotations.SerializedName;

public class Recipients {

    @SerializedName(value = "foreignAddress", alternate = {"ForeignAddress"})
    private ForeignAddress ForeignAddress;

    @SerializedName(value = "isForeign", alternate = {"IsForeign"})
    private Boolean IsForeign;

    @SerializedName(value = "name", alternate = {"Name"})
    private String Name;

    @SerializedName(value = "recipientId", alternate = {"RecipientId"})
    private String RecipientId;

    @SerializedName(value = "sequenceId", alternate = {"SequenceId"})
    private String SequenceId;

    @SerializedName(value = "tin", alternate = {"TIN"})
    private String TIN;

    @SerializedName(value = "tintype", alternate = {"TINType"})
    private String TINType;

    @SerializedName(value = "usAddress", alternate = {"USAddress"})
    private USAddress USAddress;

    public ForeignAddress getForeignAddress() {
        return ForeignAddress;
    }

    public void setForeignAddress(ForeignAddress foreignAddress) {
        ForeignAddress = foreignAddress;
    }

    public Boolean getForeign() {
        return IsForeign;
    }

    public void setForeign(Boolean foreign) {
        IsForeign = foreign;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getRecipientId() {
        return RecipientId;
    }

    public void setRecipientId(String recipientId) {
        RecipientId = recipientId;
    }

    public String getSequenceId() {
        return SequenceId;
    }

    public void setSequenceId(String SequenceId) {
        this.SequenceId = SequenceId;
    }

    public String getTIN() {
        return TIN;
    }

    public void setTIN(String TIN) {
        this.TIN = TIN;
    }

    public String getTINType() {
        return TINType;
    }

    public void setTINType(String TINType) {
        this.TINType = TINType;
    }

    public USAddress getUSAddress() {
        return USAddress;
    }

    public void setUSAddress(USAddress USAddress) {
        this.USAddress = USAddress;
    }
}
