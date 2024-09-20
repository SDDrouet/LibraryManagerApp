package com.example.graphqlserver;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public record Author (String id, String firstName, String lastName) {

    private static List<Author> authors = new ArrayList<>();
    private static final FileStorage fileStorage = new FileStorage();

    static {
        authors = fileStorage.loadAuthors();
    }

    public static Author getById(String id) {
        return authors.stream()
                .filter(author -> author.id().equals(id))
                .findFirst()
                .orElse(null);
    }

    public static List<Author> getAll() {
        return new ArrayList<>(authors);
    }

    public static Author create(String firstName, String lastName) {
        String id = "author-" + (authors.size() + 1);
        Author author = new Author(id, firstName, lastName);
        authors.add(author);
        fileStorage.saveAuthors(authors);
        return author;
    }

    public static Optional<Author> update(String id, String firstName, String lastName) {
        for (int i = 0; i < authors.size(); i++) {
            if (authors.get(i).id().equals(id)) {
                Author updatedAuthor = new Author(id, firstName, lastName);
                authors.set(i, updatedAuthor);
                fileStorage.saveAuthors(authors);
                return Optional.of(updatedAuthor);
            }
        }
        return Optional.empty();
    }

    public static boolean delete(String id) {
        boolean removed = authors.removeIf(author -> author.id().equals(id));
        if (removed) {
            fileStorage.saveAuthors(authors);
        }
        return removed;
    }
}
