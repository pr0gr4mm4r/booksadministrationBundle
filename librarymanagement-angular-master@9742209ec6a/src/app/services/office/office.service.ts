import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Office} from "../../model/office/office";

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  constructor(private http: HttpClient) {
  }

  public addOffice(officeName: String): Observable<String> {
    return this.http.post<String>(environment.apiUrl + '/create/office/' + officeName, null, {
      responseType: 'text' as 'json'
    });
  }

  public getOfficeNames(): Observable<[string]> {
    return this.http.get<[string]>(environment.apiUrl + '/officeNames');
  }

  public getOffices(): Observable<[Office]> {
    return this.http.get<[Office]>(environment.apiUrl + '/offices');
  }
}

