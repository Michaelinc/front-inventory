import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: MenuItem[];

  constructor(){
    this.items = [
      {label: 'Cargos', icon: 'pi pi-fw pi-briefcase',routerLink:['cargos']},
      {label: 'Usuarios', icon: 'pi pi-fw pi-users',routerLink:['usuarios']},
      {label: 'Mercancia', icon: 'pi pi-fw pi-book',routerLink:['mercancia']},
  ];
  }
}
