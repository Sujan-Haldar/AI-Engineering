package com.example.mcp_application.service;

import lombok.AllArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ChatService {
    private final ChatClient chatClient;

    public String chat(String message){
        String SYSTEM_PROMPT = """
                You are a task assistant. Your task is to use available tools
                and use them as an assistant.
                Don't entertain any other query.""";
        return chatClient.prompt()
                .system(SYSTEM_PROMPT)
                .user(message)
                .call()
                .content();
    }
}
