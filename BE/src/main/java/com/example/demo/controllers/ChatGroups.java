package com.example.demo.controllers;


import com.example.demo.models.ChatGroupsModel;
import com.example.demo.repository.ChatGroupsRepository;
import com.example.demo.services.ChatgroupsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Max;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/ChatGroups")
public class ChatGroups {

    @Autowired
    private ChatGroupsRepository repository;

    @Autowired
    private ChatgroupsService chatgroupsService;

    private final SimpMessagingTemplate template;

    @Autowired
    ChatGroups(SimpMessagingTemplate template) {this.template = template ; }

    @GetMapping()
    public List<ChatGroups> getChatGroups() { return chatgroupsService.get();}

    @PostMapping()
    public ChatGroupsModel createChatGroups(@RequestBody ChatGroupsModel chatGroupsModel) {
        ChatGroupsModel chatGroupsModel1 = chatgroupsService.create(chatGroupsModel);
        this.template.convertAndSend("/ChatGroups/create", chatGroupsModel.toString());
        return chatGroupsModel1;
    }
    @DeleteMapping("{id}")
    public void deleteChatGroups (@PathVariable("id") String id) {
        this.template.convertAndSend("/ChartGroups/delete", id);
        chatgroupsService.delete(id);
    }
    }

