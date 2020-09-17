import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from '../../model/book/book';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<[Book]> {
    return this.http.get<[Book]>(environment.apiUrl + '/all');
  }

  public addBookGoogle(ISBN: String, officeName: String, positionDescription: String): Observable<String> {
    return this.http.post<String>(environment.apiUrl + '/google/create/' + ISBN, [officeName, positionDescription], {
      responseType: 'text' as 'json'
    });
  }

  public updateBookGoogle(bookId: number, ISBN: String, officeName: String, positionDescription: String): Observable<String> {
    return this.http.put<String>(environment.apiUrl + '/google/update/' + ISBN,
      [bookId, officeName, positionDescription], {responseType: 'text' as 'json'});
  }

  public addBook(book: Book, addingDate: Date, releaseDate: Date): Observable<String> {
    addingDate = new Date(addingDate);
    releaseDate = new Date(releaseDate);
    book.releaseDate = null;
    book.addingDate = null;
    return this.http.post<String>(environment.apiUrl + '/create',
      [JSON.stringify(book), addingDate, releaseDate], {responseType: 'text' as 'json'});
  }

  public updateBook(book: Book, addingDate: Date, releaseDate: Date): Observable<String> {
    addingDate = new Date(addingDate);
    releaseDate = new Date(releaseDate);
    return this.http.put<String>(environment.apiUrl + '/update',
      [JSON.stringify(book), addingDate, releaseDate], {responseType: 'text' as 'json'});
  }

  public delete(bookId: number): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrl + '/delete/' + bookId);
  }
}
