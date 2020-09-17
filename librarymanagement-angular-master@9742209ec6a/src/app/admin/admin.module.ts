import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddBookFormComponent} from "./add-book-form/add-book-form.component";
import {AddBookApiComponent} from "./add-book-api/add-book-api.component";
import {SharedModule} from "../shared/shared.module";
import { AddOfficeComponent } from './add-office/add-office.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [AddBookFormComponent, AddBookApiComponent, AddOfficeComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatDatepickerModule,
        RouterModule
    ],
  exports:[
    AddBookFormComponent,
    AddBookApiComponent,
    AddOfficeComponent
  ]
})
export class AdminModule { }

/*
import {Component, OnInit} from '@angular/core';
import {BookService} from "../../services/book/book.service";
import {Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book-api.component.html',
  styleUrls: ['./add-book-api.component.css']
})
export class AddBookApiComponent implements OnInit {

  isbn: String = "";
  message: String = "";
  officeName: String = "";
  shelveId: number;
  placeAndOfficeMissing: boolean;
  placeMissing: boolean;
  update: boolean;
  positionDescription: String = "";
  floor: String = "";

  constructor(private bookService: BookService,
              private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem("role") === null) {
      this.navigateToLogin();
    }
    $("#addBookFormButton").attr("disabled", true);
  }

  addBookGoogle() {
    this.resetVariables();
    this.bookService.addBookGoogle(this.isbn, this.officeName, this.shelveId).subscribe(message => {
      if (message.includes("already present")) {
        this.update = true;
        this.activateModal(message);
      } else if (message.includes("place missing")) {
        this.placeMissing = true;
        this.activateModal(message);
      } else if (message.includes("officeName missing")) {
        this.placeAndOfficeMissing = true;
        this.activateModal(message);
      } else if (message.includes("place and office missing")) {
        this.placeAndOfficeMissing = true;
        this.activateModal(message);
      } else if (message.includes("can not find")) {
        this.message = "there is no book for this isbn found through Google Books API."
        this.borderColorRed();
      } else if (message.includes("Unexpected Rollback")) {
        this.message = "An Unexpected Rollback Exception occured."
        this.borderColorRed();
      } else if (message.includes("successful save")) {
        this.borderColorUnicGreen();
      }
    });
  }

  activateModal(message: String) {
    $('#modal').modal();
    this.message = message;
    $('#formDescriptionInput').change(this.disableButtonDecision());
    $('#formFloorNumberInput').change(this.disableButtonDecision());
    $('#formOfficeInput').change(this.disableButtonDecision());
    $('#formShelveInput').change(this.disableButtonDecision());
  }

  updateBookGoogle() {
    this.bookService.updateBookGoogle(this.isbn, this.officeName, this.shelveId).subscribe(message => {
      this.message = message;
      if (message.includes("success")) {
        this.borderColorUnicGreen();
        setTimeout(() => $('#modal').modal('hide'));
      } else if (message.includes("place missing")) {
        this.placeMissing = true;
      } else if (message.includes("place and office missing")) {
        this.placeAndOfficeMissing = true;
      }
    });
  }

  addBookGoogleWithInformation() {
    this.bookService.addBookGoogleWithInformation(this.isbn, this.officeName, this.shelveId, this.floor, this.positionDescription).subscribe(message => {
      this.message = message;
      if (message.includes("book saved")) {
        setTimeout(() => $('#modal').modal('hide'));
        this.borderColorUnicGreen();
      }
    });
  }

  updateBookGoogleWithInformation() {
    this.bookService.updateBookGoogleWithInformation(this.isbn, this.officeName, this.shelveId, this.floor, this.positionDescription).subscribe(message => {
      this.message = message;
      if (message.includes("updated")) {
        setTimeout(() => $('#modal').modal('hide'));
        this.borderColorUnicGreen();
      }
    });
  }

  borderColorRed() {
    $('#isbn').css("border-color", "red");
  }

  borderColorUnicGreen() {
    $('#isbn').css("border-color", "#a4c400");
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  disableButtonDecision(): boolean {
    if (!this.positionDescription || !this.officeName || !this.floor ||
      !this.shelveId) {
      return true;
    }
    return false;
  }

  resetVariables() {
    this.positionDescription = "";
    this.floor = "";
    this.placeMissing = false;
    this.placeAndOfficeMissing = false;
    this.update = false;
  }
}*/



