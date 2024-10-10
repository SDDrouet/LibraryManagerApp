import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Author } from '../model.ts/author.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  LIST_ALL_AUTHORS = gql`
    query {
      allAuthors {
        id
        firstName
        lastName
      }
    }
  `;

  GET_AUTHOR_BY_ID = gql`
    query authorById($id: ID!){
      authorById(id: $id) {
          id
          firstName
          lastName
      }
    }
  `

  SAVE_AUTHOR = gql`
      mutation createAuthor($firstName: String!, $lastName: String!){
          createAuthor(firstName: $firstName, lastName: $lastName) {
              id
              firstName
              lastName
          }
      }
  `

  DELETE_AUTHOR = gql`
    mutation deleteAuthor($id:  ID!){
        deleteAuthor(id: $id)
    }
  `

  UPDATE_AUTHOR = gql`
    mutation updateAuthor($id: ID!, $firstName: String!, $lastName: String!) {
        updateAuthor(id: $id, firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
        }
    }
  `

  constructor(private apollo: Apollo) { }

  listAllAuthors() {
    return this.apollo.watchQuery({
      query: this.LIST_ALL_AUTHORS
    });
  }

  getAuthorByID(id: string) {
    return this.apollo.query<any>({
      query: this.GET_AUTHOR_BY_ID,
      variables: { id }
    });
  }

  saveAuthor(author: Author) {
    return this.apollo.mutate<any>({
      mutation: this.SAVE_AUTHOR,
      variables: {
        "firstName": author.firstName,
        "lastName": author.lastName
      },
      update: (store, { data: { createAuthor } }) => { // Aquí obtienes el autor desde la respuesta
        const data: any = store.readQuery({ query: this.LIST_ALL_AUTHORS });

        // Asegúrate de que saveAuthor tenga el formato correcto
        const updatedAuthors = [...data.allAuthors, createAuthor]; // Usa el autor devuelto

        store.writeQuery({
          query: this.LIST_ALL_AUTHORS,
          data: { allAuthors: updatedAuthors },
        });
      },
    });
  }


  updateAuthor(author: Author) {
    return this.apollo.mutate<any>({
      mutation: this.UPDATE_AUTHOR,
      variables: {
        id: author.id,
        firstName: author.firstName,
        lastName: author.lastName
      }
    })
  }

  deleteAuthor(author: Author) {
    return this.apollo.mutate<any>({
      mutation: this.DELETE_AUTHOR,
      variables: {
        "id": author.id
      },
      update: (store) => {
        const data: any = store.readQuery({ query: this.LIST_ALL_AUTHORS });
        const updatedAuthors = data.allAuthors.filter((a: Author) => a.id !== author.id);
        store.writeQuery({
          query: this.LIST_ALL_AUTHORS,
          data: { allAuthors: updatedAuthors },
        });
      },
    })
  }
}
