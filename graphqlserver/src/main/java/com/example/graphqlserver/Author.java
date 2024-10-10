package com.example.graphqlserver;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

public record Author (String id, String firstName, String lastName, boolean status) {

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
        return authors.stream()
                .filter(Author::status) // Filtra solo los autores con status true
                .collect(Collectors.toList()); // Recolecta en una nueva lista
    }

    public static Author create(String firstName, String lastName) {
        String id;

        // Generar un ID único
        do {
            id = "author-" + UUID.randomUUID().toString();
        } while (exists(id)); // Verificar si el ID ya existe

        Author author = new Author(id, firstName, lastName, true); // Asignar status true al nuevo autor
        authors.add(author);
        fileStorage.saveAuthors(authors);
        return author;
    }

    // Método para verificar si el ID existe
    private static boolean exists(String id) {
        return authors.stream().anyMatch(author -> author.id().equals(id));
    }

    public static Optional<Author> update(String id, String firstName, String lastName) {
        for (int i = 0; i < authors.size(); i++) {
            if (authors.get(i).id().equals(id)) {
                Author updatedAuthor = new Author(id, firstName, lastName, authors.get(i).status()); // Mantener el status existente
                authors.set(i, updatedAuthor);
                fileStorage.saveAuthors(authors);
                return Optional.of(updatedAuthor);
            }
        }
        return Optional.empty();
    }

    public static boolean delete(String id) {
        for (int i = 0; i < authors.size(); i++) {
            if (authors.get(i).id().equals(id)) {
                // Crear un nuevo autor con el mismo ID, nombre y estado cambiado a false
                Author updatedAuthor = new Author(authors.get(i).id(), authors.get(i).firstName(), authors.get(i).lastName(), false);
                authors.set(i, updatedAuthor); // Reemplazar el autor existente
                fileStorage.saveAuthors(authors); // Guardar los cambios
                return true; // Retornar true si se realizó la operación
            }
        }
        return false; // Retornar false si no se encontró el autor
    }

}
