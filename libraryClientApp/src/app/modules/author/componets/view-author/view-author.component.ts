import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractView } from 'src/app/core/abstractView';
import { ViewAuthorView } from './view-author.view';
import { Author } from 'src/app/model.ts/author.model';
import { ViewAuthorPresenter } from './presenter/view-author.presenter';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-view-author',
    templateUrl: './view-author.component.html',
    styleUrls: ['./view-author.component.scss'],
    providers: [ViewAuthorPresenter, MessageService]
})
export class ViewAuthorComponent extends AbstractView implements OnInit, ViewAuthorView {
    author: Author = {};

    constructor(public messageService: MessageService, private viewAuthorPresenter: ViewAuthorPresenter, public config: DynamicDialogConfig) {
        super(messageService);
        viewAuthorPresenter.view = this;
    }

    ngOnInit(): void {
        this.viewAuthorPresenter.getAuthorById(this.config.data.authorId);
    }

}
