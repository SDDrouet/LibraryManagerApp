import { View } from "src/app/core/view";
import { Author } from "src/app/model.ts/author.model";

export interface ViewAuthorView extends View {
    author: Author;
}
