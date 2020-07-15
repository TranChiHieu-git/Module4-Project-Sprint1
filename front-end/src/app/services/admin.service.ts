import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../models/account';
import {Employee} from '../employee/employee';
import {Employees} from '../models/employees';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  API_URL = 'http://localhost:8080/account';

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(this.API_URL);
  }

  findByInfoId(accountId: number): Observable<Employees> {
    return this.httpClient.get<Employees>(this.API_URL + '/employee/' + accountId);
  }

  findAccountById(accountId: number): Observable<Account> {
    return this.httpClient.get<Account>(this.API_URL + '/' + accountId);
  }

  create(account: Account): Observable<Account> {
    return this.httpClient.post<Account>(this.API_URL, account);
  }

  deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.API_URL + '/' + id);
  }

  edit(account: Account): Observable<Account> {
    return this.httpClient.patch<Account>(this.API_URL + '/' + account.accountId, account);
  }
}
