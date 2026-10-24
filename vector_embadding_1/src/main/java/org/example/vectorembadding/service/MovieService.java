package org.example.vectorembadding.service;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.example.vectorembadding.model.Movie;
import org.example.vectorembadding.model.MovieData;
import org.example.vectorembadding.model.MovieMatch;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.json.JsonMapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
@AllArgsConstructor
public class MovieService {
    private final EmbeddingModel embeddingModel;
    private final JsonMapper jsonMapper;
    private final List<Movie> movieEmbaddings = new ArrayList<>();
    @PostConstruct
    public void initializeMovies() throws IOException {
        System.out.println("Embedding creation started..");
        ClassPathResource resource = new ClassPathResource("movies.json");
        InputStream inputStream = resource.getInputStream();
        List<MovieData> movieDataList = jsonMapper.readValue(
                inputStream, new TypeReference<>() {});
        for(MovieData movieData : movieDataList){
            float[] embedding = embeddingModel.embed(movieData.getDescription());
            movieEmbaddings.add(
                    Movie.builder()
                        .title(movieData.getTitle())
                        .description(movieData.getDescription())
                        .embedding(embedding)
                        .build()
            );
        }
        inputStream.close();
        System.out.println("Embedding has been created..");
    }

    public List<MovieMatch> search(String query){
        List<MovieMatch> movieMatches = new ArrayList<>();
        float[] userQueryembedding = embeddingModel.embed(query);
        for(Movie movie : movieEmbaddings){
            double similarity = cosineSimilarity(userQueryembedding,movie.getEmbedding());
            movieMatches.add(MovieMatch.builder()
                            .title(movie.getTitle())
                            .description(movie.getDescription())
                            .similarity(similarity)
                    .build());
        }

        movieMatches.sort((a,b)->Double.compare(b.getSimilarity(),a.getSimilarity()));
        return movieMatches.stream().limit(5).toList();
    }
    private double cosineSimilarity(float[] a, float[] b) {
        double dotProduct = 0.0;
        double normA = 0.0;
        double normB = 0.0;

        for (int i = 0; i < a.length; i++) {
            dotProduct += (a[i] * b[i]);
            normA += (a[i] * a[i]);
            normB += (b[i] * b[i]);
        }

        if (normA == 0 || normB == 0) {
            return 0.0;
        }

        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }
}
