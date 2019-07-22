package com.example.demo.models;
import com.example.demo.models.Message;
import com.google.gson.Gson;

import java.sql.Timestamp;


public class MessageAdd extends Message {
    private String type ;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public MessageAdd(String type,String id, String sender, String context, boolean main, Timestamp time, String groupChatId) {
        super(id,sender,context,main,time,groupChatId);
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