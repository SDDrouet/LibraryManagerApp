package com.example.graphqlserver;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class AuthorController {

    @QueryMapping
    public Author authorById(@Argument String id) {
        return Author.getById(id);
    }

    @QueryMapping
    public List<Author> allAuthors() {
        return Author.getAll();
    }

    @MutationMapping
    public Author createAuthor(@Argument String firstName, @Argument String lastName) {
        return Author.create(firstName, lastName);
    }

    @MutationMapping
    public Author updateAuthor(@Argument String id, @Argument String firstName, @Argument String lastName) {
        return Author.update(id, firstName, lastName).orElse(null);
    }

    @MutationMapping
    public boolean deleteAuthor(@Argument String id) {
        return Author.delete(id);
    }
}
