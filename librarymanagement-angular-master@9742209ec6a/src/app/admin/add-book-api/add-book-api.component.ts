import {Component, OnInit} from '@angular/core';
import {BookService} from "../../services/book/book.service";
import {Router} from "@angular/router";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {OfficeService} from "../../services/office/office.service";

declare var $: any;

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book-api.component.html',
  styleUrls: ['./add-book-api.component.css']
})
export class AddBookApiComponent implements OnInit {

  ISBN: String = "";
  message: String = "";
  officeName: String = "";
  positionDescription: String = "";
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  options: string[];
  officeMissing: boolean;
  notFound: boolean;
  unexpectedRollback: boolean;
  successfulSave: boolean;

  constructor(private bookService: BookService,
              private officeService: OfficeService,
              private router: Router) {
  }

  ngOnInit() {
    this.prepareRouter();
    this.officeService.getOfficeNames().subscribe(offices => {
      this.options = offices;
    });
    if (localStorage.getItem("role") === null) {
      this.navigateToLogin();
    }
    $("#addBookButton").attr("disabled", true);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  _filter(value: String): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  disableButtonDecision(): boolean {
    const regex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    if (this.positionDescription && this.officeName && regex.test(this.ISBN.toString())) {
      return false;
    }
    return true;
  }

  addBookGoogle() {
    this.bookService.addBookGoogle(this.ISBN, this.officeName, this.positionDescription).subscribe(message => {
      this.message = message;
      this.resetVariables();
      if (message.includes("Office Missing")) {
        this.officeMissing = true;
      } else if (message.includes("can not find")) {
        this.notFound = true;
      } else if (message.includes("Unexpected Rollback")) {
        this.unexpectedRollback = true;
      } else if (message.includes("Successful Save")) {
        this.successfulSave = true;
      }
      this.activateModal();
    });
  }

  activateModal() {
    $('#modal').modal();
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  resetVariables() {
    this.successfulSave = false;
    this.notFound = false;
    this.unexpectedRollback = false;
    this.officeMissing = false;
  }

  redirectToOfficeCreation() {
    $('#modal').modal("hide");
    localStorage.setItem("officeName", this.officeName.toString());
    this.router.navigate(['addOffice']);
  }

  resetPage() {
    this.router.navigate(['addBookApi']);
  }

  prepareRouter(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload';
  }
}


