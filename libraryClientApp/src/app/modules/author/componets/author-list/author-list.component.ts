import { Component, OnInit } from '@angular/core';
import { AbstractView } from 'src/app/core/abstractView';
import { Author } from 'src/app/model.ts/author.model';
import { AuthorListView } from './author-list.view';
import { AuthorListPresenter } from './presenter/author-list.presenter';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ViewAuthorComponent } from '../view-author/view-author.component';
import { CreateAuthorComponent } from '../create-author/create-author.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-author-list',
    templateUrl: './author-list.component.html',
    styleUrls: ['./author-list.component.scss'],
    providers: [AuthorListPresenter, DialogService, MessageService, ConfirmationService]
})
export class AuthorListComponent extends AbstractView implements OnInit, AuthorListView {
    authors: Author[] = [];
    ref: DynamicDialogRef | undefined;

    constructor(public messageService: MessageService, private authorListPresenter: AuthorListPresenter,
        public dialogService: DialogService, private confirmationService: ConfirmationService) {
        super(messageService);
        authorListPresenter.view = this;
    }

    ngOnInit(): void {
        this.authorListPresenter.listAuthors();
    }

    show(id: string) {
        this.ref = this.dialogService.open(ViewAuthorComponent, {
            header: 'Autor',
            modal: true,
            width: '30%',
            data: {
                authorId: id
            }
        });
    }

    showCreateAuthor() {
        this.ref = this.dialogService.open(CreateAuthorComponent, {
            header: 'Crear Nuevo Autor',
            modal: true,
            closeOnEscape: false,
            width: '30%'
        });
    }

    showDeleteConfirmation(author: Author) {
        this.confirmationService.confirm({
            message: `Esta seguro de eliminar el AUTOR: ${author.firstName} ${author.lastName}`,
            header: 'Confirmación',
            acceptLabel: 'Eliminar',
            rejectLabel: 'Cancelar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                try {
                    this.authorListPresenter.deleteAuthor(author);
                } catch (error) {
                    this.showError('Error', 'Ocurrio un problema al eliminar el autor');
                }
            }
        });
    }

}
