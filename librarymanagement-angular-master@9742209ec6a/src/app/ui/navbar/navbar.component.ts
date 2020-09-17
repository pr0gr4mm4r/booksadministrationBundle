import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem("role") === "ADMIN") {
      this.isAdmin = true;
    }
  }

  logout() {
    localStorage.clear();
  }

  setOverviewSort(sortingCriteria: string) {
    localStorage.setItem("sortingCriteria", sortingCriteria);
  }
}
