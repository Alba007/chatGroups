package com.example.demo ;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ship {
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public coordinates sendCoordinates(@Payload coordinates coordinates) {
        return coordinates; }
}

