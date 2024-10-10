import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  items: MenuItem[];

  constructor() {
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

  ngOnInit(): void { }
}
