import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookService} from "../../services/book/book.service";
import {Book} from "../../model/book/book";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {OfficeService} from "../../services/office/office.service";
import {map, startWith} from "rxjs/operators";

declare var $: any;

@Component({
  selector: 'app-add-book-form',
  templateUrl: './add-book-form.component.html',
  styleUrls: ['./add-book-form.component.css']
})
export class AddBookFormComponent implements OnInit {

  book: Book = new Book();
  message: String = "";
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  options: string[];
  officeMissing: boolean;
  successfulSave: boolean;

  constructor(private bookService: BookService,
              private officeService: OfficeService,
              private router: Router) {
  }

  ngOnInit() {
    this.prepareRouter();
    if(localStorage.getItem("success") === "true"){
      this.successfulSave = true;
    }
    if(this.successfulSave){
      this.activateModal();
    }
    localStorage.setItem("success", "false");
    this.book.releaseDate = null;
    this.book.addingDate = null;
    this.officeService.getOfficeNames().subscribe(offices => {
      this.options = offices;
    });
    if (localStorage.getItem("role") === null) {
      this.navigateToLogin();
    }
    $("#submitBook").attr("disabled", true);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  _filter(value: String): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  addBook() {
    this.bookService.addBook(this.book, this.book.addingDate, this.book.releaseDate).subscribe(message => {
      this.resetVariables();
      this.message = message;
      if (message.includes("Office Missing")) {
        this.officeMissing = true;
        localStorage.setItem("success", "false");
        this.activateModal();
      } else if (message.includes("Successful Save")) {
        this.successfulSave = true;
        localStorage.setItem("success", "true");
        this.resetPage();
      }
    });
  }

  activateModal() {
    $('#modal').modal({backdrop: 'static', keyboard: false});
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  disableButtonDecision(): boolean {
    const regex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    if (this.book.description && this.book.addingDate && this.book.author && this.book.pageCount
      && this.book.publisher && this.book.releaseDate && this.book.title &&
      this.book.positionDescription && this.book.officeName && regex.test(this.book.isbn.toString())) {
      return false;
    }
    return true;
  }

  redirectToOfficeCreation() {
    $('#modal').modal("hide");
    localStorage.setItem("officeName", this.book.officeName.toString());
    this.router.navigate(['addOffice']);
  }

  resetVariables() {
    this.successfulSave = false;
    this.officeMissing = false;
  }

  resetPage() {
    this.router.navigate(['addBookForm']);
  }

  prepareRouter(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload';
  }
}
