import { Component, OnInit } from '@angular/core';
import { AbstractView } from 'src/app/core/abstractView';
import { Author } from 'src/app/model.ts/author.model';
import { AuthorListView } from './author-list.view';
import { AuthorListPresenter } from './presenter/author-list.presenter';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent extends AbstractView implements OnInit, AuthorListView {
  authors: Author[] = [];

  constructor(private authorListPresenter: AuthorListPresenter) {
      super();
      authorListPresenter.view = this;
  }

  ngOnInit(): void {
    
  }

}
