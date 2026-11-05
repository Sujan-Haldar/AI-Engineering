package com.example.mcp_application.controller;

import com.example.mcp_application.service.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @GetMapping("/chat")
    public String chat(@RequestParam String message){
        return chatService.chat(message);
    }

}
