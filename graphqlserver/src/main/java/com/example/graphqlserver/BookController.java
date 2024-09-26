package com.example.graphqlserver;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class BookController {

    @QueryMapping
    public Book bookById(@Argument String id) {
        return Book.getById(id);
    }

    @QueryMapping
    public List<Book> allBooks() {
        return Book.getAll();
    }

    @MutationMapping
    public Book createBook(@Argument String name, @Argument int pageCount, @Argument String authorId, @Argument float price, @Argument int year) {
        return Book.create(name, pageCount, authorId, price, year);
    }

    @MutationMapping
    public Book updateBook(@Argument String id, @Argument String name, @Argument int pageCount, @Argument String authorId, @Argument float price, @Argument int year) {
        return Book.update(id, name, pageCount, authorId, price, year).orElse(null);
    }

    @MutationMapping
    public boolean deleteBook(@Argument String id) {
        return Book.delete(id);
    }

    @SchemaMapping
    public Author author(Book book) {
        return Author.getById(book.authorId());
    }
}
