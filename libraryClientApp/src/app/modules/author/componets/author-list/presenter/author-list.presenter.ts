import { Injectable } from '@angular/core';
import { Presenter } from 'src/app/core/presenter';
import { AuthorService } from 'src/app/services/author.service';
import { AuthorListView } from '../author-list.view';
import { Author } from 'src/app/model.ts/author.model';

@Injectable()
export class AuthorListPresenter implements Presenter {
  view: AuthorListView | null = null;

  constructor(private authorService: AuthorService) {}

  listAuthors() {
    this.authorService.listAllAuthors().valueChanges.subscribe(({ data, loading }) => {
      if (!loading && this.view) {
        const { allAuthors } = data as { allAuthors: Author[] }; // Casting directo
        this.view.authors = allAuthors; // Asignar directamente
      }
    });
  }
  

  deleteAuthor(author: Author) {
    this.authorService.deleteAuthor(author).subscribe(
      () => {
        this.listAuthors();
        this.view?.showSuccess('Exito', 'Autor eliminado con exito');
      }
    );
  }
}
