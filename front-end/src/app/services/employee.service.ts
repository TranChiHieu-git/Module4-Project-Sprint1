import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../models/employee';
import {Observable} from 'rxjs';
import {Department} from '../models/department';
import {Account} from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  API_URL_EMPLOYEE = 'http://localhost:8081/employee/list';
  API_URL_ACCOUNT = 'http://localhost:8081/employee/account/name';
  API_URL_POSITION = 'http://localhost:8081/employee/position';
  API_URL_DEPARTMENT = 'http://localhost:8081/employee/department';
  constructor(private httpClient: HttpClient) { }
  findAll(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.API_URL_EMPLOYEE);
  }
  findEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(this.API_URL_EMPLOYEE + '/' + id);
  }
  editEmployeeById(employee: Partial<Employee>): Observable<Employee> {
    return this.httpClient.patch<Employee>(this.API_URL_EMPLOYEE + '/' + employee.id, employee);
  }
  editAccountByName(account: Partial<Account>): Observable<Account> {
    return this.httpClient.patch<Account>(this.API_URL_ACCOUNT + '/' + account.accountName, account);
  }
  findEmployeeByAccountName(name: string): Observable<Employee> {
    return this.httpClient.get<Employee>(this.API_URL_EMPLOYEE + '/name' + '/' + name);
  }
  findAllPosition(): Observable<Position[]> {
    return this.httpClient.get<Position[]>(this.API_URL_POSITION);
  }
  findAllDepartment(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.API_URL_DEPARTMENT);
  }
  findAccountByName(name: string): Observable<Account> {
    return this.httpClient.get<Account>(this.API_URL_EMPLOYEE + '/name/' + name);
  }
}
