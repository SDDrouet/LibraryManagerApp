package com.example.graphqlserver;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class FileStorage {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final File authorFile = new File("authors.json");
    private final File bookFile = new File("books.json");

    public List<Author> loadAuthors() {
        try {
            if (authorFile.exists()) {
                return objectMapper.readValue(authorFile, new TypeReference<List<Author>>() {});
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    public void saveAuthors(List<Author> authors) {
        try {
            objectMapper.writeValue(authorFile, authors);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Book> loadBooks() {
        try {
            if (bookFile.exists()) {
                return objectMapper.readValue(bookFile, new TypeReference<List<Book>>() {});
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }

    public void saveBooks(List<Book> books) {
        try {
            objectMapper.writeValue(bookFile, books);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
