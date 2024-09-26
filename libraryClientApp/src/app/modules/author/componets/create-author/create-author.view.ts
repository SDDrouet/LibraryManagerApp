import { FormGroup } from "@angular/forms";
import { View } from "src/app/core/view";
import { Author } from "src/app/model.ts/author.model";

export interface CreateAuthorView extends View {
    author: Author;
    frmAuthor: FormGroup;

    initFrmAuthor(): FormGroup;
    onSubmit(): void;
    saveAuthor(): void;
}
