package com.example.demo.models;

import java.sql.Timestamp;
import java.time.DateTimeException;

public class Message {
   private String id ;
   private String sender ;
   private String context ;
   private boolean main ;
   private Timestamp time ;
   private String groupChatId ;

    public Message() {

    }

    public Message(String id, String sender, String context, boolean main, Timestamp time, String groupChatId) {
        this.id = id;
        this.sender = sender;
        this.context = context;
        this.main = main;
        this.time = time;
        this.groupChatId = groupChatId;
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public boolean isType() {
        return main;
    }

    public void setType(boolean main) {
        this.main = main;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public String getGroupChatId() {
        return groupChatId;
    }

    public void setGroupChatId(String groupChatId) {
        this.groupChatId = groupChatId;
    }
}
