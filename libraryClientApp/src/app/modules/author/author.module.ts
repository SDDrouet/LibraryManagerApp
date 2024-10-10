import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorListComponent } from './componets/author-list/author-list.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ViewAuthorComponent } from './componets/view-author/view-author.component';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { CreateAuthorComponent } from './componets/create-author/create-author.component';
import {ReactiveFormsModule} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthorListPresenter } from './componets/author-list/presenter/author-list.presenter';
import { CreateAuthorPresenter } from './componets/create-author/presenter/create-author.presenter';


@NgModule({
  declarations: [
    AuthorListComponent,
    ViewAuthorComponent,
    CreateAuthorComponent
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    CardModule,
    TooltipModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
    MessagesModule,
    ConfirmDialogModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
    DialogService,

    AuthorListPresenter,
    CreateAuthorPresenter
  ]
})
export class AuthorModule { }
