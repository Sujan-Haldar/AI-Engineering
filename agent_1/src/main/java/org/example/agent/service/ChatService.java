package org.example.agent.service;

import lombok.AllArgsConstructor;
import org.example.agent.tools.CalculatorTool;
import org.example.agent.tools.CurrencyExchangeTool;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ChatService {
    private final ChatClient chatClient;
    private final CalculatorTool calculatorTool;
    private final CurrencyExchangeTool currencyExchangeTool;
    private final List<Message> history = new ArrayList<>();

    private static final String SYSTEM_PROMPT = """
            You are a helpful AI assistant with access to external tools.

            Follow these rules:
            1. For arithmetic calculations, ALWAYS use the calculator tool.
            2. Always use calculator tool for even trivial calculation
            3. For currency conversion or exchange rates, ALWAYS use the convertCurrency tool.
            5. You may call multiple tools when solving a multi-step request.
            6. After receiving tool results, explain the answer naturally.
            7. Never invent exchange-rate information.
            """;

    public String chat(String message){
        history.add(new UserMessage(message));
        String response = chatClient.prompt()
                .system(SYSTEM_PROMPT)
                .messages(history)
                .tools(calculatorTool,currencyExchangeTool)
                .call()
                .content();
        history.add(new AssistantMessage(response));
        return response;
    }

}
