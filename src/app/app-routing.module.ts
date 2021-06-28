import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CommodityComponent } from './components/commodity/commodity.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RoleComponent } from './components/role/role.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:"/cargos",
    pathMatch:"full"
  },
  {
    path: 'mercancia',
    component: CommodityComponent
  },
  {
    path: 'usuarios',
    component: UserComponent
  },
  {
    path: 'cargos',
    component: RoleComponent
  },

  {
    path: '**',
    component: PageNotFoundComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
