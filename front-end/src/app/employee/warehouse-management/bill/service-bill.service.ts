import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from './bill';

@Injectable({
  providedIn: 'root'
})
export class ServiceBillService {

  API_URL_USER = 'http://localhost:3000/user';
  constructor(private httpClient: HttpClient) { }
  findAllUser(): Observable<Bill[]> {
    return this.httpClient.get<Bill[]>(this.API_URL_USER);
  }
}
