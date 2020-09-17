import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  english: boolean = true;
  isAdmin: boolean = false;
  isUser: boolean = false;

  constructor() {}

  ngOnInit() {
    if (localStorage.getItem("role") === "ADMIN") {
      this.isAdmin = true;
    }
    if (localStorage.getItem("role") === "USER") {
      this.isUser = true;
    }
  }

}
