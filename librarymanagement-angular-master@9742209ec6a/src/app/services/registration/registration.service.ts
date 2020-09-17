import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {
  }

  register(user: Object): Observable<Object> {
    return this.http.post(environment.apiUrl + '/addUser', user)
  }

  checkIfEmailPersisted(email: String): Observable<boolean> {
    return this.http.get<boolean>(environment.apiUrl + '/checkIfEmailPersisted/' + email)
  }

  checkIfNamePersisted(name: String): Observable<boolean> {
    return this.http.get<boolean>(environment.apiUrl + '/checkIfNamePersisted/' + name)
  }
}
