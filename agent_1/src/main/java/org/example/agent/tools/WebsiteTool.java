package org.example.agent.tools;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Collectors;

@Component
public class WebsiteTool {
    private final Path workspace = Path.of("generated-path").toAbsolutePath().normalize();

    public WebsiteTool(){
        try{
            Files.createDirectories(workspace);
            System.out.println("Workspace Created. ::"+workspace.toAbsolutePath());
        }catch (IOException e){
            throw new IllegalStateException("Unable to crate website workspace.");
        }
    }

    @Tool(description = "Create a new directory inside the website workspace.")
    public String createDirectory(
            @ToolParam(description = "Relative directory path , for example codelab")
            String path
    ){
        try {
            Path directory = safePath(path);
            System.out.println("Directory path::"+directory.toAbsolutePath());
            Files.createDirectories(directory);
            return "Directory created successfully: " + path;
        } catch (IOException e) {
            return "Failed to create directory: " + e.getMessage();
        }
    }
    @Tool(description = """
            Creates or overwrites a text file inside the website workspace.
            Use this to create HTML, CSS and JavaScript files.
            """)
    public String writeFile(
            @ToolParam(description = "Relative file path, for example " +
                    "codelab/index.html") String path,
            @ToolParam(description = "Complete content that should be " +
                    "written into the file") String content
    ){
        try {
            Path file = safePath(path);
            Files.createDirectories(file.getParent());
            Files.writeString(file,content, StandardCharsets.UTF_8);
            return "File written successfully: " + path;
        }catch(IOException ex){
            return "Failed to write file: " + ex.getMessage();
        }

    }
    @Tool(description = """
            Reads the content of an existing file from the website workspace.
            """)
    public String readFile(
            @ToolParam(description = "Relative file path")
            String path
    ){
        try {
            return Files.readString(safePath(path), StandardCharsets.UTF_8);
        } catch (IOException e) {
            return "Failed to read file: " + e.getMessage();
        }
    }

    @Tool(description = "List all files and directories inside a website project")
    public String listFiles(
            @ToolParam(description = "Relative directory path, for example codelab")
            String path
    ){
        try{
            Path directory = safePath(path);
            if (!Files.exists(directory)) {
                return "Directory does not exist: " + path;
            }
            try (var files = Files.walk(directory)){
                return files.filter(file->!file.equals(directory))
                        .map(workspace::relativize)
                        .map(Path::toString)
                        .collect(Collectors.joining("\n"));
            }


        }catch (IOException ex){
            return "Failed to list files: " + ex.getMessage();
        }
    }

    public Path safePath(String path){
        Path resolved = workspace.resolve(path).normalize();
        if(!resolved.startsWith(workspace)){
            throw new IllegalArgumentException("Access outside generated-sites " +
                    "is not allowed");
        }
        return resolved;
    }


}
