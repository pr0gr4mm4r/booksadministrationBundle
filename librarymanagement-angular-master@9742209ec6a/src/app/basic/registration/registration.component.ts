import {Component, OnInit} from '@angular/core';
import {RegistrationService} from "../../services/registration/registration.service";
import {User} from "../../model/user/user";
import {Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = new User();
  emailMissing: boolean;
  nameMissing: boolean;
  confirmPassword: String = "";

  constructor(private registrationService: RegistrationService,
              private router: Router) {
  }

  ngOnInit() {
  }

  registerPreparation() {
    this.registrationService.checkIfEmailPersisted(this.user.email).subscribe(data => this.emailMissing = data);
    this.registrationService.checkIfNamePersisted(this.user.name).subscribe(data => this.nameMissing = data);
    window.setTimeout(() => this.register(), 490);
  }

  register() {
    if(this.emailMissing || this.nameMissing || this.comparePasswords()){
      this.activateModal();
      return;
    }
    this.registrationService.register(this.user).subscribe(() => {
      this.router.navigate(['login']);
    }, () => {
      this.activateModal();
    });
  }

  activateModal() {
    $('#modal').modal({backdrop: 'static', keyboard: false});
  }

  comparePasswords(): boolean {
    return this.user.password !== this.confirmPassword;
  }
}
