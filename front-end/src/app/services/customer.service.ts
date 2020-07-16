import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public readonly API_URL = 'http://localhost:8080/customers/';

  constructor(private httpClient: HttpClient) {
  }

  getAllCustomer(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.API_URL);
  }

  getCustomerById(id: number): Observable<Customer> {
    // return this.httpClient.get<Student>(`${this.API_URL}/${id}`);
    return this.httpClient.get<Customer>(this.API_URL + '/' + id);
  }

  addNewCustomer(customer: Partial<Customer>): Observable<Customer> {
    return this.httpClient.post<Customer>(this.API_URL, customer);
  }

  deleteCustomerById(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.API_URL + '/' + id);
  }
  editCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.patch<Customer>(this.API_URL +  '/' + customer.id, customer);
  }
}
