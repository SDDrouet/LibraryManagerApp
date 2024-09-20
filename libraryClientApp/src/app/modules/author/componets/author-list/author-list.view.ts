import { inject } from "@angular/core/testing";
import { View } from "src/app/core/view";
import { Author } from "src/app/model.ts/author.model";

export interface AuthorListView extends View {
    authors: Author[];
}
