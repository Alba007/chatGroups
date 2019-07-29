package com.example.demo.models;
import com.example.demo.models.Message;
import com.google.gson.Gson;
import org.bson.types.Binary;

import java.sql.Timestamp;


public class AddMessage extends Message {
    private String typee ;

    public String getTypee() {
        return typee;
    }

    public void setType(String type) {
        this.typee = type;
    }
    public AddMessage(String typee,String id, String sender, String context, MessageType typeMess, String time, String groupChatId) {
        super(id,sender,context,typeMess,time,groupChatId);
        this.typee=typee ;
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
