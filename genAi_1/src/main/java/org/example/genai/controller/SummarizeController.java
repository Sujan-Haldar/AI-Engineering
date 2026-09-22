package org.example.genai.controller;

import lombok.AllArgsConstructor;
import org.example.genai.service.SummarizeService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class SummarizeController {
    private final SummarizeService summarizeService;
    @PostMapping("/summerize")
    public String summarize(@RequestBody String message){
        return summarizeService.summarize(message);
    }
}
