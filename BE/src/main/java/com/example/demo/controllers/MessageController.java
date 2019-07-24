package com.example.demo.controllers;
import com.example.demo.models.ChatMessage;
import com.example.demo.models.Message;
import com.example.demo.models.AddMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.demo.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;



@CrossOrigin
@RestController
@RequestMapping("/api")
public class MessageController {

    private final SimpMessagingTemplate template;

    @Autowired
    private MessageRepository repository;

    @Autowired
    MessageController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @GetMapping("/messages")
    public List<Message> get() {
        return repository.findAll() ;

    }

    @GetMapping("/messages/{id}")
    public List<Message> getMessageByChatId(@PathVariable("id") String id){
        return repository.findByGroupChatId(id);

    }

   /* @RequestMapping(value = "/messages/{id}", method = RequestMethod.GET)
    public Message get(@PathVariable("id") String id) {
        return repository.findById(id).orElse(null);
    }*/


    @RequestMapping(value = "/messages", method = RequestMethod.POST)
    public Message store(@Valid @RequestBody Message message) {
        repository.save(message);
       AddMessage messageInfo=new AddMessage("post",message.getId(),message.getSender(),
              message.getContext(), message.getType() ,message.getTime(),message.getGroupChatId());
       this.template.convertAndSend("/topic/public", messageInfo.toString());
        System.out.println(messageInfo.toString());
        return message;
    }
    @RequestMapping(value = "/messages/{id}", method = RequestMethod.PUT)
    public Message update(@PathVariable("id") String id, @Valid @RequestBody Message message) {
        message.setId(id);
        repository.save(message);
        AddMessage messageInfo=new AddMessage("update",message.getId(),message.getSender(),
                message.getContext(), message.getType() ,message.getTime(),message.getGroupChatId());
        this.template.convertAndSend("/send/message", messageInfo.toString());
        System.out.println(messageInfo.toString());
        return message;
    }

}
