import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './componets/book-list/book-list.component';

const routes: Routes = [
  { path: '', component: BookListComponent }, // Componente que listará los libros
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
