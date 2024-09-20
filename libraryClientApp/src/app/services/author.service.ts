import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

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

  constructor(private apollo: Apollo) {}

  listAllAuthors() {
    return this.apollo.query<any>({
      query: this.LIST_ALL_AUTHORS
    })
  }

  getAuthorByID(id: string) {
    return this.apollo.query<any>({
      query: this.GET_AUTHOR_BY_ID,
      variables: { id }
    });
  }
  
}
