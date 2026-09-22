package org.example.genai.controller;

import lombok.AllArgsConstructor;
import org.example.genai.service.ChatService;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @PostMapping("/chat")
    public String chat(@RequestBody String message){
        return chatService.chat(message);
    }
    @PostMapping(value="/chat-stream",produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamChat(@RequestBody String message){
        return chatService.streamChat(message);
    }

}
