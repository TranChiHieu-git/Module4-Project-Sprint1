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

  loginUrl = 'http://localhost:8081/login';

  constructor(private http: HttpClient) {
  }

  attemptAuth(userinfo: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, userinfo, httpOptions);
  }
}
