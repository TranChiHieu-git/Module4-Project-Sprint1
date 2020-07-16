import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Distributor, TypeOfDistributor} from '../models/distributor';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DistributorService {
  MY_API_URL = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) {
  }
  findAll(): Observable<Distributor[]> {
    return this.httpClient.get<Distributor[]>(this.MY_API_URL + '/distributor/list');
  }
  findById(id: number): Observable<Distributor> {
    return this.httpClient.get<Distributor>(this.MY_API_URL + '/distributor/' + id);
  }
  create(distributor: Partial<Distributor>): Observable<Distributor> {
    return this.httpClient.post<Distributor>(this.MY_API_URL + '/distributor/create', distributor);
  }
  deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.MY_API_URL + '/distributor/delete' + id);
  }
  editEmployee(distributor, distributorId): Observable<any> {
    return this.httpClient.post(this.MY_API_URL + '/' + distributorId, distributor);
  }
  findByName(name: string): Observable<TypeOfDistributor> {
    return this.httpClient.get<TypeOfDistributor>(this.MY_API_URL + '/type_distributor/' + name);
  }
}