import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {Account} from '../models/account';
import {Employees} from '../models/employees';
import {Role} from '../models/role';
import {TokenStorageService} from '../auth/token-storage.service';
import {Customer} from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  API_URL = 'http://localhost:8080/account';
  API_ROLE_URL = 'http://localhost:8080/role';
  httpOptions: any;
  httpOptions2: any;

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200/create', 'Access-Control-Allow-Methods': 'GET,PUT,POST'
    };
    this.httpOptions2 = {
      headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200/admin', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getAllCourse(currentPage, size, search, nameRole): Observable<any> {
    return this.httpClient.get(this.API_URL + '?page=' + currentPage + '&size=' + size + '&search=' + search + '&role=' + nameRole);
  }

  getAllCourseAdmin(currentPage, size): Observable<any> {
    return this.httpClient.get('http://localhost:8080/accountrole?page=' + currentPage + '&size=' + size + '&search=' + 'ROLE_ADMIN',
      this.httpOptions2);
  }

  getAllCoursePartner(currentPage, size): Observable<any> {
    return this.httpClient.get('http://localhost:8080/accountrole?page=' + currentPage + '&size=' + size + '&search=' + 'ROLE_PARTNER',
      this.httpOptions2);
  }

  getAllCourseWarhouse(currentPage, size): Observable<any> {
    return this.httpClient.get('http://localhost:8080/accountrole?page=' + currentPage + '&size=' + size + '&search=' + 'ROLE_WAREHOUSE',
      this.httpOptions2);
  }

  getAllCourseUser(currentPage, size): Observable<any> {
    return this.httpClient.get('http://localhost:8080/accountrole?page=' + currentPage + '&size=' + size + '&search=' + 'ROLE_MEMBER',
      this.httpOptions2);
  }

  findAll(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(this.API_URL);
  }

  findAllRole(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.API_ROLE_URL);
  }

  findRoleById(roleId: number): Observable<any> {
    return this.httpClient.get<Role>(this.API_ROLE_URL + '/' + roleId, this.httpOptions2);
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

  create(account: Account): Observable<any> {
    return this.httpClient.post<Account>(this.API_URL + '/create', account, this.httpOptions2);
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
