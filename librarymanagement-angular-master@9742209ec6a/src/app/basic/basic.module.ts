import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationComponent} from "./authentication/authentication.component";
import {RegistrationComponent} from "./registration/registration.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {SharedModule} from "../shared/shared.module";
import {OverviewComponent} from "./overview/overview.component";



@NgModule({
  declarations: [AuthenticationComponent, RegistrationComponent, LandingPageComponent, OverviewComponent],
  imports: [
    CommonModule,
    SharedModule
  ], exports:[
    AuthenticationComponent, RegistrationComponent, LandingPageComponent, OverviewComponent
  ]
})
export class BasicModule { }
