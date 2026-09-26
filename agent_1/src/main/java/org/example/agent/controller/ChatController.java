package org.example.agent.controller;

import lombok.AllArgsConstructor;
import org.example.agent.service.ChatService;
import org.example.agent.service.WebsiteService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class ChatController {
    private final ChatService chatService;
    private final WebsiteService websiteService;

    @PostMapping("/chat")
    public String chat(@RequestBody String message) {
        return chatService.chat(message);
    }

    @PostMapping("/website")
    public String generate(@RequestBody String message) {
        return websiteService.generate(message);
    }
}
