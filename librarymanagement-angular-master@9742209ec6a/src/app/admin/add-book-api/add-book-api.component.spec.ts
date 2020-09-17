import {AddBookApiComponent} from './add-book-api.component';

import {BookService} from "../../services/book/book.service";
import {OfficeService} from "../../services/office/office.service";

import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

let addBookApiComponent: AddBookApiComponent;

beforeEach(() => {
  let httpClient: HttpClient;
  let router: Router;
  addBookApiComponent = new AddBookApiComponent(
    new BookService(httpClient),
    new OfficeService(httpClient),
    router);
});

it('should create', () => {
  expect(addBookApiComponent).toBeTruthy();
});

it('should set all variables to false', () => {
  addBookApiComponent.notFound = true;
  addBookApiComponent.officeMissing = true;
  addBookApiComponent.successfulSave = true;
  addBookApiComponent.unexpectedRollback = true;

  addBookApiComponent.resetVariables();

  expect(addBookApiComponent.notFound).toBe(false);
  expect(addBookApiComponent.officeMissing).toBe(false);
  expect(addBookApiComponent.successfulSave).toBe(false);
  expect(addBookApiComponent.unexpectedRollback).toBe(false);
});

it(' officeName should set disable button decision to true', () => {
  addBookApiComponent.positionDescription = "positionDescription";
  addBookApiComponent.officeName = "";
  addBookApiComponent.ISBN = "3435466565";

  expect(addBookApiComponent.disableButtonDecision()).toBe(true);
});

it('positionDescription should set disable button decision to true', () => {
  addBookApiComponent.positionDescription = "";
  addBookApiComponent.officeName = "officeName";
  addBookApiComponent.ISBN = "3435466565";

  expect(addBookApiComponent.disableButtonDecision()).toBe(true);
});

it('variables should set disable button decision to false', () => {
  addBookApiComponent.positionDescription = "positionDescription";
  addBookApiComponent.officeName = "officeName";
  addBookApiComponent.ISBN = "3435466565";
  expect(addBookApiComponent.disableButtonDecision()).toBe(false);
});

