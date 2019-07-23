package com.example.demo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("ChatsGroupsCollection")
public class ChatGroupsModel {
    @Id
    private String id;
    private String name;
    private Boolean main;

    public ChatGroupsModel() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getType() {
        return main;
    }

    public void setType(Boolean main) {
        this.main = main;
    }
}