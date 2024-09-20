import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'libraryClientApp';
  items: MenuItem[] = [];

  autors: any[] = [];

  constructor(private readonly apollo: Apollo) {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: '/'
      },
      {
        label: 'Libros',
        icon: 'pi pi-fw pi-book',
        routerLink: '/books'
      },
      {
        label: 'Autores',
        icon: 'pi pi-fw pi-users',
        routerLink: '/authors'
      }
    ];
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
            {
              allAuthors {
                  id
                  firstName
                  lastName
              }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.autors = result.data?.allAuthors;

        console.log(this.autors);
      });
  }
}
