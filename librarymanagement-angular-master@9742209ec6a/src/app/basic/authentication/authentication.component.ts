import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import { Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  email: String;
  password: String;
  loginFail = false;
  roles: [String];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {}


  handleLogin() {
    this.authenticationService.authenticationService(this.email, this.password).subscribe(() => {
      this.loginFail = false;
      this.authenticationService.receive_roles(this.email).subscribe(roles => {
        this.roles = roles;
      });
      window.setTimeout(() => this.set_local_storage_and_redirect_depending_on_role(), 100);
    }, () => {
      this.loginFail = true;
      this.activateModal();
    });
  }

  set_local_storage_and_redirect_depending_on_role() {
    if (this.roles.includes("USER")) {
      localStorage.setItem("role", "USER");
    } else if (this.roles.includes("ADMIN")) {
      localStorage.setItem("role", "ADMIN");
    }

    if (this.roles.find(role => role.toString() === "ADMIN")) {
      this.router.navigate(['addBookApi']);
    } else if (this.roles.find(role => role.toString() === "USER")) {
      this.router.navigate(['overview']);
    } else {
      this.router.navigate(['/']);
    }
  }

    activateModal() {
      $('#modal').modal({backdrop: 'static', keyboard: false});
    }
}


