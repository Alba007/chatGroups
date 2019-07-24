package com.example.demo.repository;

import com.example.demo.models.ChatMessage;
import com.example.demo.models.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {
    public List<Message> findByGroupChatId(String id);
}
