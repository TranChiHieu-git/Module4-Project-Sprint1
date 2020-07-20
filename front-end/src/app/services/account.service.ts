import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from '../auth/token-storage.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  httpOptions: any;
  baseURL = 'http://localhost:8081/';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200/', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  helloAdmin(): Observable<any> {
    return this.http.get(this.baseURL + 'admin', this.httpOptions);
  }

  helloUser(): Observable<any> {
    return this.http.get(this.baseURL + 'home', this.httpOptions);
  }

  helloMember(): Observable<any> {
    return this.http.get(this.baseURL + 'member', this.httpOptions);
  }
}
