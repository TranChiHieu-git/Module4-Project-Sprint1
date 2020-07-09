import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Distributor} from '../models/distributor';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {
  API_URL = 'http://localhost:3000/listDistributor';
  constructor(private httpClient: HttpClient) { }
  findAll(): Observable<Distributor[]> {
    return this.httpClient.get<Distributor[]>(this.API_URL);
  }
  findById(id: number): Observable<Distributor>{
    return this.httpClient.get<Distributor>(this.API_URL + '/' + id);
  }
  create(distributor: Partial<Distributor>): Observable<Distributor> {
    return this.httpClient.post<Distributor>(this.API_URL, distributor);
  }
  deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.API_URL + '/' + id);
  }
  editEmployee(distributor, distributorId): Observable<any>{
    return this.httpClient.put(this.API_URL + '/' + distributorId, distributor);
  }
}
