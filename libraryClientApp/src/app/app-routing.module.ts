import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './componets/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'books', loadChildren: () => import('./modules/book/book.module').then(m => m.BookModule) },
  { path: 'authors', loadChildren: () => import('./modules/author/author.module').then(m => m.AuthorModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
