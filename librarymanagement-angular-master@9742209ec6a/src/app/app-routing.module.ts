import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddBookApiComponent} from "./admin/add-book-api/add-book-api.component";
import {AuthenticationComponent} from "./basic/authentication/authentication.component";
import {RegistrationComponent} from "./basic/registration/registration.component";
import {OverviewComponent} from "./basic/overview/overview.component";
import {LandingPageComponent} from "./basic/landing-page/landing-page.component";
import {AddBookFormComponent} from "./admin/add-book-form/add-book-form.component";
import {AddOfficeComponent} from "./admin/add-office/add-office.component";


const routes: Routes = [
  {path:'', component: LandingPageComponent},
  {path:'landingPage', component: LandingPageComponent},
  {path:'login', component: AuthenticationComponent},
  {path:'register', component: RegistrationComponent},
  {path:'addBookApi', component: AddBookApiComponent},
  {path:'addBookForm', component: AddBookFormComponent},
  {path:'addOffice', component: AddOfficeComponent},
  {path:'overview', component: OverviewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
