import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private email: String;
  private password: String;

  constructor(private http: HttpClient) {
  }

  authenticationService(email: String, password: String) {
    return this.http.get(environment.apiUrl + '/login',
      {
        headers: {authorization: this.createBasicAuthToken(email, password)},
        observe: 'response'
      }).pipe(map((user) => {
      this.email = email;
      this.password = password;
    }));
  }

  receive_roles(email: String):Observable<[String]> {
    return this.http.get<[String]>(environment.apiUrl + '/userRolesByEmail/' + email);
  }

  createBasicAuthToken(email: String, password: String) {
    return 'Basic ' + window.btoa(email + ":" + password)
  }
}
