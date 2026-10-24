package org.example.rag.controller;

import lombok.AllArgsConstructor;
import org.example.rag.service.ChatService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
@AllArgsConstructor
public class ChatController {
    private final ChatService chatService;
    @GetMapping
    public String chat(@RequestParam String message){
        return chatService.chat(message);
    }

}
