import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BookService} from "./services/book/book.service";
import {AuthenticationService} from "./services/authentication/authentication.service";
import {RegistrationService} from "./services/registration/registration.service";
import {AdminModule} from "./admin/admin.module";
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BasicModule} from "./basic/basic.module";
import {OfficeService} from "./services/office/office.service";
import {DatePipe} from "@angular/common";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    BasicModule,
    SharedModule
  ],
  providers: [BookService, OfficeService, AuthenticationService, RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
