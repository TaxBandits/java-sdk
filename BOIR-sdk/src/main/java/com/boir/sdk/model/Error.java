package com.boir.sdk.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Error {

    @JsonProperty("Id")
    private String Id;

    @JsonProperty("Name")
    public String Name;

    @JsonProperty("Message")
    public String Message;

    public String getId() {
        return Id;
    }

    public void setId(String id) {
        Id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getMessage() {
        return Message;
    }

    public void setMessage(String message) {
        Message = message;
    }
}
