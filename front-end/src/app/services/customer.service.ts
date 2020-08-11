import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/customer';
import {TokenStorageService} from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public readonly API_URL = 'http://localhost:8080/customers';
  public readonly API_URL_ACCOUNT = 'http://localhost:8080/customer-account';
  public readonly API_URL_MEMBER = 'http://localhost:8080/createMemberAccount';

  httpOptions: any;

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200/', 'Access-Control-Allow-Methods': 'POST,GET,PUT',
    };
  }
  getAllCustomer(): Observable<any> {
    return this.httpClient.get<Customer[]>(this.API_URL, this.httpOptions);
  }

  getCustomerById(id: number): Observable<any> {
    // return this.httpClient.get<Student>(`${this.API_URL}/${id}`);
    return this.httpClient.get<Customer>(this.API_URL + '/' + id, this.httpOptions);
  }
  getCustomerByName(name: string): Observable<Customer> {
    // return this.httpClient.get<Student>(`${this.API_URL}/${id}`);
    return this.httpClient.get<Customer>(this.API_URL + '/' + name);
  }

  addNewCustomer(customer: Partial<Customer>): Observable<any> {
    return this.httpClient.post<Customer>(this.API_URL + '/', customer, this.httpOptions);
  }
  addNewMember(customer: Partial<Customer>): Observable<any> {
    return this.httpClient.post<Customer>(this.API_URL_MEMBER, customer, this.httpOptions);
  }

  deleteCustomerById(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.API_URL + '/' + id);
  }

  editCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.patch<Customer>(this.API_URL + '/' + customer.id, customer);
  }

  getCustomerByAccountName(accountName: string): Observable<any> {
    return this.httpClient.get<Customer>(this.API_URL_ACCOUNT + '/' + accountName);
  }
}
