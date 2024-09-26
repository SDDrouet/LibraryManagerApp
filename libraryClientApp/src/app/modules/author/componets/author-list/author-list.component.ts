import { Component, OnInit } from '@angular/core';
import { AbstractView } from 'src/app/core/abstractView';
import { Author } from 'src/app/model.ts/author.model';
import { AuthorListView } from './author-list.view';
import { AuthorListPresenter } from './presenter/author-list.presenter';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ViewAuthorComponent } from '../view-author/view-author.component';
import { CreateAuthorComponent } from '../create-author/create-author.component';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-author-list',
    templateUrl: './author-list.component.html',
    styleUrls: ['./author-list.component.scss'],
    providers: [AuthorListPresenter, DialogService, MessageService]
})
export class AuthorListComponent extends AbstractView implements OnInit, AuthorListView {
    authors: Author[] = [];
    ref: DynamicDialogRef | undefined;

    constructor(private authorListPresenter: AuthorListPresenter, private messageService: MessageService, public dialogService: DialogService) {
        super();
        authorListPresenter.view = this;
    }

    ngOnInit(): void {
        this.authorListPresenter.listAuthors();
    }

    show(id: string) {
        this.ref = this.dialogService.open(ViewAuthorComponent, {
            header: 'Autor',
            modal: true,
            width: '70%',
            data: {
                authorId: id
            }
        });
    }

    showCreateAuthor() {
        this.ref = this.dialogService.open(CreateAuthorComponent, {
            header: 'Crear Autor',
            modal: true,
            closeOnEscape: false,
            width: '30%'
        });
    }

}
