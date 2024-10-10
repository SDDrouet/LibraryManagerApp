import { Injectable } from "@angular/core";
import { Presenter } from "src/app/core/presenter";
import { CreateAuthorView } from "../create-author.view";
import { AuthorService } from "src/app/services/author.service";
import { Author } from "src/app/model.ts/author.model";

@Injectable()
export class CreateAuthorPresenter implements Presenter{
    view: CreateAuthorView | null = null;

    constructor(private authorService: AuthorService) {}

    saveAuthor(author: Author) {
        this.authorService.saveAuthor(author).subscribe(
            () => {
                this.view?.showSuccess('Exito', 'Autor Guardado con exito');
                this.view?.closeDialog()
            },
            (error) => {
                console.error(error);
            }
        );
    }
}
