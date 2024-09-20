import { Injectable } from '@angular/core';
import { Presenter } from 'src/app/core/presenter';
import { AuthorService } from 'src/app/services/author.service';
import { AuthorListView } from '../author-list.view';

@Injectable()
export class AuthorListPresenter implements Presenter {
  view: AuthorListView | null = null;

  constructor(private authorService: AuthorService) {}

  listAuthors() {
    this.authorService.listAllAuthors().subscribe(({ data }) => {
      try {
        if (this.view) {
          this.view.authors = data.allAuthors;
          console.log(this.view.authors);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
}
