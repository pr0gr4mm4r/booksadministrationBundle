import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar/navbar.component";
import {NavbarAuthComponent} from "./navbar-auth/navbar-auth.component";
import {AppRoutingModule} from "../app-routing.module";



@NgModule({
  declarations: [NavbarComponent, NavbarAuthComponent],
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  exports:[
    NavbarComponent,
    NavbarAuthComponent
  ]
})
export class UiModule { }
