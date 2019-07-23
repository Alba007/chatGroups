package com.example.demo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.google.gson.Gson;


@Document("ChatsGroupsCollection")
public class ChatGroupsModel {
    @Id
    private String id;
    private String name;
    private boolean main;

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

    public boolean isMain() {
        return main;
    }

    public void setMain(boolean main) {
        this.main = main;
    }

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}