import { Component, OnInit } from '@angular/core';
import { AbstractView } from 'src/app/core/abstractView';
import { CreateAuthorView } from './create-author.view';
import { Author } from 'src/app/model.ts/author.model';
import { CreateAuthorPresenter } from './presenter/create-author.presenter';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-create-author',
    templateUrl: './create-author.component.html',
    styleUrls: ['./create-author.component.scss'],
    providers: [CreateAuthorPresenter, MessageService]
})
export class CreateAuthorComponent extends AbstractView implements OnInit, CreateAuthorView {
    author: Author = {};
    frmAuthor: FormGroup = new FormGroup({});

    constructor(private createAuthorPresenter: CreateAuthorPresenter,
        private formBuilder: FormBuilder,
        public messageService: MessageService,
        private ref: DynamicDialogRef,
        private confirmationService: ConfirmationService) {
        super(messageService);
        createAuthorPresenter.view = this;
    }

    ngOnInit(): void {
        this.frmAuthor = this.initFrmAuthor();
        this.showMessage("infooo prueba");
    }

    initFrmAuthor(): FormGroup {
        return this.formBuilder.group({
            firstName: [this.author.firstName, Validators.required],
            lastName: [this.author.lastName, Validators.required]
        });  
    }

    onSubmit() {
        if(this.frmAuthor.valid) {
            this.author = this.frmAuthor.value;
            this.showConfirmation();
        }
    }

    showConfirmation() {
        this.confirmationService.confirm({
            message: 'Deseas guardar este Autor?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Guardar',
            rejectLabel: 'Cancelar',
            accept: () => {
                try {
                    this.createAuthorPresenter.saveAuthor(this.author);
                } catch (error) {
                    this.showError('Error', 'Ocurrio un error al guardar los datos.');
                }
            }
        });
    }

    closeDialog() : void {
        this.ref.close();
    }

    // Auxiliares
    get f() {
        return this.frmAuthor.controls;
    }
}
