package com.example.graphqlserver;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public record Book (String id, String name, int pageCount, String authorId, float price, int year) {

    private static List<Book> books = new ArrayList<>();
    private static final FileStorage fileStorage = new FileStorage();

    static {
        books = fileStorage.loadBooks();
    }

    public static Book getById(String id) {
        return books.stream()
                .filter(book -> book.id().equals(id))
                .findFirst()
                .orElse(null);
    }

    public static List<Book> getAll() {
        return new ArrayList<>(books);
    }

    public static Book create(String name, int pageCount, String authorId, float price, int year) {
        String id = "book-" + (books.size() + 1);
        Book book = new Book(id, name, pageCount, authorId, price, year);
        books.add(book);
        fileStorage.saveBooks(books);
        return book;
    }

    public static Optional<Book> update(String id, String name, int pageCount, String authorId, float price, int year) {
        for (int i = 0; i < books.size(); i++) {
            if (books.get(i).id().equals(id)) {
                Book updatedBook = new Book(id, name, pageCount, authorId, price, year);
                books.set(i, updatedBook);
                fileStorage.saveBooks(books);
                return Optional.of(updatedBook);
            }
        }
        return Optional.empty();
    }

    public static boolean delete(String id) {
        boolean removed = books.removeIf(book -> book.id().equals(id));
        if (removed) {
            fileStorage.saveBooks(books);
        }
        return removed;
    }
}
