package com.example.demo.services;

import com.example.demo.models.ChatGroupsModel;
import com.example.demo.repository.ChatGroupsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatgroupsService {

    @Autowired
    private ChatGroupsRepository chatGroupsRepository;

    public ChatGroupsModel create(ChatGroupsModel chatgroupsModel){
        return chatGroupsRepository.insert(chatgroupsModel);
    }

    public List<ChatGroupsModel> get(){
        return chatGroupsRepository.findAll();
    }

    public void delete(String id) { chatGroupsRepository.findById(id).ifPresent(e -> chatGroupsRepository.delete(e));}
}
