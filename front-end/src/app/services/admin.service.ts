import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../models/account';
import {Role} from '../models/role';
import {Employees} from '../models/employees';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  API_URL = 'http://localhost:8080/account';
  API_ROLE_URL = 'http://localhost:8080/role';

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(this.API_URL);
  }

  findAllRole(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.API_ROLE_URL);
  }

  findRoleById(roleId: number): Observable<Role> {
    return this.httpClient.get<Role>(this.API_ROLE_URL + '/' + roleId);
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
    // @ts-ignore
    return this.httpClient.patch<void>(this.API_URL + '/delete/' + id);
  }

  edit(account: Account): Observable<Account> {
    return this.httpClient.put<Account>(this.API_URL + '/update/' + account.accountId, account);
  }
}
