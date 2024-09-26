import { Injectable } from "@angular/core";
import { Presenter } from "src/app/core/presenter";
import { ViewAuthorView } from "../view-author.view";
import { AuthorService } from "src/app/services/author.service";

@Injectable()
export class ViewAuthorPresenter implements Presenter {
    view: ViewAuthorView | null = null;
    
    constructor(private authorService: AuthorService) {
        
    }

    public getAuthorById(id: string) {
        this.authorService.getAuthorByID(id).subscribe(
            ({data}) => {
                if(data) {
                    if (this.view)
                    this.view.author = data.authorById;
                } else {
                    this.view?.showMessage('mensaje');
                }
            },
            () => {
                this.view?.showMessage("mal");
            }
        )
    }
}
