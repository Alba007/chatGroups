package com.example.demo.models;

import org.springframework.lang.Nullable;


public class Message {
   private String id ;
   private String sender ;
   private String context ;
   private MessageType type ;
   private String time ;
   private String groupChatId ;
   @Nullable
   private byte[] file;

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE,
        DELETE,
        IMAGE
    }
    public Message() {

    }

    public Message(String id, String sender, String context, MessageType type, String time, String groupChatId) {
        this.id = id;
        this.sender = sender;
        this.context = context;
        this.type = type;
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

    public MessageType getType() {
        return type;
    }

    public void setMessageType(MessageType type) {
        this.type = type;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Nullable
    public byte[] getFile() {
        return file;
    }

    public void setFile(@Nullable byte[] file) {
        this.file = file;
    }

    public String getGroupChatId() {
        return groupChatId;
    }

    public void setGroupChatId(String groupChatId) {
        this.groupChatId = groupChatId;
    }
}
