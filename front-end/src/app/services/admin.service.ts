import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  API_URL = 'http://localhost:3000/account';
  accountList: Observable<Account[]>;

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Account[]> {
    this.accountList = this.httpClient.get<Account[]>(this.API_URL);
    return this.accountList;
  }

  findByUser(userName: string): Observable<Account[]> {
    this.accountList = this.httpClient.get<Account[]>(this.API_URL + '?user_name=' + userName);
    return this.accountList;
  }

  create(account: Account): Observable<Account> {
    return this.httpClient.post<Account>(this.API_URL, account);
  }

  deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.API_URL + '/' + id);
  }

  edit(account: Account): Observable<Account>{
    return this.httpClient.patch<Account>(this.API_URL + '/' + account.id, account)
  }
}
