package com.example.demo.controllers;
import com.example.demo.models.Message;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.demo.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;



@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/message")
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

    @RequestMapping(value = "/sensor/{id}", method = RequestMethod.GET)
    public Message get(@PathVariable("id") String id) {
        return repository.findById(id).get();
    }




    @RequestMapping(value = "/sensor", method = RequestMethod.POST)
    public Message store(@Valid @RequestBody Message mesage) {
        repository.save(mesage);
//        AddSensor sensorInfo=new AddSensor("post",sensor.get_id(),sensor.getName(),
//                sensor.getDescription(),sensor.getworkTime(),sensor.getData(),sensor.getGpsData());
//        this.template.convertAndSend("/send/sensor", sensorInfo.toString());
//        System.out.println(sensorInfo.toString());
        return mesage;
    }

}
