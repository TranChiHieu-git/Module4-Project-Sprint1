import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtResponse} from './jwt-response';
import {AuthLoginInfo} from './login-info';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  , 'Access-Control-Allow-Origin': 'http://localhost:4200'
};
@Injectable({
  providedIn: 'root'
})
export class AuthJwtService {
  isLoggedIn = false;

  loginUrl = 'http://localhost:8080/';
  // registerUrl = 'http://localhost:8080/customers';
  constructor(private http: HttpClient) {
  }

  attemptAuth(userInfo: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, userInfo, httpOptions);
  }
  // registerAuth(userInfo: AuthLoginInfo): Observable<JwtResponse> {
  //   return this.http.post<JwtResponse>(this.registerUrl, userInfo, httpOptions);
  // }
  logout(): void {
    this.isLoggedIn = false;
  }
}
