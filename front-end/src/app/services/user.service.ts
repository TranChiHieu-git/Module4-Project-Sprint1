import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public readonly API_URL = 'http://localhost:8080/users/';
  private httpOptions: any;
  public readonly API_URL_ACCOUNT = 'http://localhost:8080/customer-account';
  constructor(private httpClient: HttpClient) {
  }
  getAllUser(currentPage, size, search): Observable<any> {
    return this.httpClient.get(this.API_URL + '?page=' + currentPage  + '&size=' + size + '&search=' + search);
  }
  getUserById(id: number): Observable<User> {
    // return this.httpClient.get<Student>(`${this.API_URL}/${id}`);
    return this.httpClient.get<User>(this.API_URL + '/' + id);
  }

  addNewUser(user: Partial<User>): Observable<User> {
    return this.httpClient.post<User>(this.API_URL, user);
  }

  deleteCustomerById(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.API_URL + '/' + id);
  }

  editCustomer(customer: User): Observable<User> {
    return this.httpClient.patch<User>(this.API_URL + '/' + customer.id, customer);
  }
  getCustomerByAccountName(accountName: string): Observable<User> {
    return this.httpClient.get<User>(this.API_URL_ACCOUNT + '/' + accountName);
  }
}
