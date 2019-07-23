package com.example.demo.models;
import com.example.demo.models.Message;
import com.google.gson.Gson;

import java.sql.Timestamp;


public class AddMessage extends Message {
    private String type ;

    public String getTypee() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    public AddMessage(String type,String id, String sender, String context, MessageType typeMess, Timestamp time, String groupChatId) {
        super(id,sender,context,typeMess,time,groupChatId);
        this.type=type ;
    }

    @Override
    public String toString() {
//        return "AddSensor{" +
//                "type='" + type + '\'' +
//                ", id='" + get_id() + '\'' +
//                ", name='" + getName() + '\'' +
//                ", description='" + getDescription() + '\'' +
//                ", workTime=" + getworkTime() +
//                ", data=" + getData() +
//                ", gpsData=" + getGpsData() +
//                '}';
        return new Gson().toJson(this);
    }
}
