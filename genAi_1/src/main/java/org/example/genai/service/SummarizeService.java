package org.example.genai.service;

import lombok.AllArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SummarizeService {
    private final ChatClient chatClient;

    public String summarize(String message){
        String output = chatClient.prompt()
                .user("Summarize :\n\n" + message)
                .call()
                .content();
        return output;
    }
}
