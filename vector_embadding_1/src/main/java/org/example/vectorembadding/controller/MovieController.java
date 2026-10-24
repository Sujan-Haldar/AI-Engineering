package org.example.vectorembadding.controller;

import lombok.AllArgsConstructor;
import org.example.vectorembadding.model.MovieMatch;
import org.example.vectorembadding.service.MovieService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/movies")
@AllArgsConstructor
public class MovieController {
    private final MovieService movieService;
    @GetMapping("/search")
    public List<MovieMatch> search(@RequestParam String query){
        return movieService.search(query);
    }
}
