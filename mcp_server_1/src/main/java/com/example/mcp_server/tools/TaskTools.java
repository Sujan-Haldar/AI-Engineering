package com.example.mcp_server.tools;

import org.springframework.ai.mcp.annotation.McpTool;
import org.springframework.ai.mcp.annotation.McpToolParam;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TaskTools {
    List<String> tasks = new ArrayList<>();

    @McpTool(
            name = "create_task",
            description = "Create a new task"
    )
    public String createTask(
            @McpToolParam(
                    required = true,
                    description = "Title or Name of the task"
            )
            String title
    ){
        tasks.add(title);
        return "Task Created: " + title;
    }

    @McpTool(
            name = "list_tasks",
            description = "List all pending tasks"
    )
    public List<String> listTasks() {
        return List.copyOf(tasks);
    }


    @McpTool(
            name = "complete_task",
            description = "Complete a task using its exact title"
    )
    public String completeTask(
            @McpToolParam(
                    description = "Exact title of the task",
                    required = true
            )
            String title
    ) {
        boolean removed = tasks.remove(title);
        if (removed) {
            return "Task completed: " + title;
        }
        return "Task not found: " + title;
    }
}
