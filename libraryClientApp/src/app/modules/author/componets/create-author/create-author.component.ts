import { Component, OnInit } from '@angular/core';
import { AbstractView } from 'src/app/core/abstractView';
import { CreateAuthorView } from './create-author.view';
import { Author } from 'src/app/model.ts/author.model';
import { CreateAuthorPresenter } from './presenter/create-author.presenter';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-create-author',
    templateUrl: './create-author.component.html',
    styleUrls: ['./create-author.component.scss'],
    providers: [CreateAuthorPresenter, MessageService]
})
export class CreateAuthorComponent extends AbstractView implements OnInit, CreateAuthorView {
    author: Author = {};
    frmAuthor: FormGroup;

    constructor(private createAuthorPresenter: CreateAuthorPresenter,
        private formBuilder: FormBuilder,
        private messageService: MessageService) {
        super();
        createAuthorPresenter.view = this;
        this.frmAuthor = this.initFrmAuthor();
    }

    ngOnInit(): void {
    }

    initFrmAuthor(): FormGroup {
        return this.formBuilder.group({
            firstName: [this.author.firstName, Validators.required],
            lastName: [this.author.lastName, Validators.required]
        })
    }

    onSubmit() {
        this.author = this.frmAuthor.value;
        this.saveAuthor();
    }

    saveAuthor() {
        let isCorrect: boolean = this.createAuthorPresenter.saveAuthor(this.author);

        if (isCorrect) {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Autor Guardado con exito.', life: 2000 });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al guardar los datos.', life: 2000 });
        }
    }

    // Auxiliares
    get f() {
        return this.frmAuthor.controls;
    }
}
