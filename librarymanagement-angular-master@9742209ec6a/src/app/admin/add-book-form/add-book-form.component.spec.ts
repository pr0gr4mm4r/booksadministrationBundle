

import {BookService} from "../../services/book/book.service";
import {OfficeService} from "../../services/office/office.service";

import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AddBookFormComponent} from "./add-book-form.component";
import {Book} from "../../model/book/book";

let addBookFormComponent: AddBookFormComponent;

beforeEach(() => {
  let httpClient: HttpClient;
  let router: Router;
  addBookFormComponent = new AddBookFormComponent(
    new BookService(httpClient),
    new OfficeService(httpClient),
    router);
});

it('should create', () => {
  expect(addBookFormComponent).toBeTruthy();
});

it('should set all variables to false', () => {
  addBookFormComponent.officeMissing = true;
  addBookFormComponent.successfulSave = true;

  addBookFormComponent.resetVariables();

  expect(addBookFormComponent.officeMissing).toBe(false);
  expect(addBookFormComponent.successfulSave).toBe(false);
});

it('variables should set disable button decision to false', () => {
  addBookFormComponent.book = new Book();
  addBookFormComponent.book.description = "description";
  addBookFormComponent.book.addingDate = new Date();
  addBookFormComponent.book.author = "author";
  addBookFormComponent.book.pageCount = 100;
  addBookFormComponent.book.publisher = "publisher";
  addBookFormComponent.book.releaseDate = new Date();
  addBookFormComponent.book.title = "title";
  addBookFormComponent.book.positionDescription = "positionDescription";
  addBookFormComponent.book.officeName = "officeName";
  addBookFormComponent.book.isbn = "3435466565";

  expect(addBookFormComponent.disableButtonDecision()).toBe(false);
});


it('not set attribute book should set disable button decision to true', () => {
  expect(addBookFormComponent.disableButtonDecision()).toBe(true);
});


