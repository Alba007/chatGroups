package com.example.demo.controllers;
import com.example.demo.models.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserController {
    private final SimpMessagingTemplate template;
    @Autowired
    private UserRepository repository;
    @Autowired
    UserController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @GetMapping("/user")
    public List<User> getUser() {
        return repository.findAll() ;
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public User store(@Valid @RequestBody User user) throws IOException {
        repository.save(user);
        User userInfo=new User(user.getId(),user.getUsername(),
                user.getPassword(), user.getEmail());
        this.template.convertAndSend("/users", userInfo.toString());
        System.out.println(userInfo.toString());
        return user;
    }
    @GetMapping("/users/{id}")
    public User getMessageByChatId(@PathVariable("id") String id){
        return repository.findById(id).orElse(null) ;
    }
}
