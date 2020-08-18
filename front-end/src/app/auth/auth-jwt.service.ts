import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtResponse} from './jwt-response';
import {AuthLoginInfo} from './login-info';
import {BehaviorSubject, Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
};
@Injectable({
  providedIn: 'root'
})
export class AuthJwtService {
  isLoggedIn = false;
  private currentUserSubject: BehaviorSubject<any>;

  public currentUser: Observable<any>;
  loginUrl = 'http://localhost:8080/';
  constructor(private http: HttpClient) {
  }

  attemptAuth(userInfo: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, userInfo, httpOptions);
  }

  public get currentUserValue(): AuthLoginInfo {
    return this.currentUserSubject.value;
  }
  logout(): void {
    this.isLoggedIn = false;
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
