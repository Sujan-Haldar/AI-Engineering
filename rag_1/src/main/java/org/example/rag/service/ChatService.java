package org.example.rag.service;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.document.Document;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatClient chatClient;
    private final VectorStore vectorStore;

    @Value("classpath*:knowledge/*.pdf")
    private Resource[] policyFiles;

    @PostConstruct
    public void loadKnowledge(){
        System.out.println("Knowledge loding started.");
        List<Document> allChunks = new ArrayList<>();
        TokenTextSplitter splitter = TokenTextSplitter.builder()
                .withChunkSize(300)
                .build();
        for(Resource resource : policyFiles){
            PagePdfDocumentReader reader = new PagePdfDocumentReader(resource);
            List<Document> pages = reader.read();
            List<Document> chunks = splitter.apply(pages);
            allChunks.addAll(chunks);
        }
        vectorStore.add(allChunks);
        System.out.println("Knowledge loding completed.");
    }
    public String chat(String message) {
        List<Document> relevantChunks = vectorStore.similaritySearch(
                SearchRequest.builder()
                        .query(message)
                        .topK(4)
                        .build()
        );

        StringBuilder context = new StringBuilder();

        for (Document document : relevantChunks) {

            context.append(document.getText())
                    .append("\n\n");
        }

        String prompt = getPrompt(context);

        return chatClient.prompt()
                .system(prompt)
                .user(message)
                .call()
                .content();
    }

    private static @NonNull String getPrompt(StringBuilder context) {
        String finalContext = context.toString();

        String prompt = """
                You are an AI customer support assistant for our e-commerce company.

                Answer the customer using ONLY the company information provided below.

                If the answer is not available in the provided information, say:
                "I don't have that information in the company documents."
                
                COMPANMY INFORMATION
                %s
                
                """.formatted(finalContext);
        return prompt;
    }


}
