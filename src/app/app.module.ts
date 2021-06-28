import { LOCALE_ID,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';

import localeCo from '@angular/common/locales/es-CO';
registerLocaleData(localeCo, 'es-CO');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengConfig } from './primeng.config';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommodityComponent } from './components/commodity/commodity.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserComponent } from './components/user/user.component';
import { RoleComponent } from './components/role/role.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CommodityComponent,
    UserComponent,
    RoleComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengConfig
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-CO' }, MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
