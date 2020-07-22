import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../models/account';
import {Employees} from '../models/employees';
import {Role} from '../models/role';
import {Customer} from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  API_URL = 'http://localhost:8080/account';
  API_ROLE_URL = 'http://localhost:8080/role';
  httpOptions: any;

  constructor(private httpClient: HttpClient) {
  }

  getAllCourse(currentPage, size, search, nameRole): Observable<any> {
    return this.httpClient.get(this.API_URL + '?page=' + currentPage + '&size=' + size + '&search=' + search + '&role=' + nameRole);
  }

  getAllCourseAdmin(currentPage, size, search): Observable<any> {
    return this.httpClient.get('http://localhost:8080/accountrole?page=' + currentPage + '&size=' + size + '&search=' + 'ROLE_ADMIN',
      this.httpOptions);
  }

  getAllCoursePartner(currentPage, size, search): Observable<any> {
    return this.httpClient.get('http://localhost:8080/accountrole?page=' + currentPage + '&size=' + size + '&search=' + 'ROLE_PARTNER',
      this.httpOptions);
  }

  getAllCourseWarhouse(currentPage, size, search): Observable<any> {
    return this.httpClient.get('http://localhost:8080/accountrole?page=' + currentPage + '&size=' + size + '&search=' + 'ROLE_WAREHOUSE',
      this.httpOptions);
  }

  getAllCourseUser(currentPage, size, search): Observable<any> {
    return this.httpClient.get('http://localhost:8080/accountrole?page=' + currentPage + '&size=' + size + '&search=' + 'ROLE_MEMBER',
      this.httpOptions);
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

  findByInfoUserId(accountId: number): Observable<Customer> {
    return this.httpClient.get<Customer>(this.API_URL + '/user/' + accountId);
  }

  findAccountById(accountId: number): Observable<Account> {
    return this.httpClient.get<Account>(this.API_URL + '/' + accountId);
  }

  create(account: Account): Observable<Account> {
    return this.httpClient.post<Account>(this.API_URL + '/create', account);
  }


  delete(account: Account): Observable<Account> {
    // return this.httpClient.delete<void>(this.API_URL + '/delete/' + account.accountId, account);
    // @ts-ignore
    return this.httpClient.request('delete', this.API_URL + '/delete/' + account.accountId, {body: account});
  }

  edit(account: Account): Observable<Account> {
    return this.httpClient.put<Account>(this.API_URL + '/update/' + account.accountId, account);
  }
}
