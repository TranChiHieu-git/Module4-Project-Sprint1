import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from './bill';
import {WareHouse} from './ware-house';
import {Transportation} from '../../../models/transportation';
import {TypeBill} from '../../../models/type-bill';
import {StorageLocation} from '../../../models/storage-location';
import {Pay} from '../../../models/pay';

@Injectable({
  providedIn: 'root'
})
export class ServiceBillService {


  API_URL_USER = 'http://localhost:8080/bills/';
  API_URL_WAREHOUSE = 'http://localhost:8080/wareHouses/';
  API_URL_TRANS = 'http://localhost:8080/transportations/';
  API_URL_TYPE_BILL = 'http://localhost:8080/typeBills/';
  API_URL_STORAGE = 'http://localhost:8080/storageLocations/';
  API_URL_PAY = 'http://localhost:8080/pays/';
  constructor(private httpClient: HttpClient) { }
  findAllUser(): Observable<Bill[]> {
    return this.httpClient.get<Bill[]>(this.API_URL_USER);
  }
  findAllPay(): Observable<Pay[]> {
    return this.httpClient.get<Pay[]>(this.API_URL_PAY);
  }
  findAllStorageLocation(): Observable<StorageLocation[]> {
    return this.httpClient.get<StorageLocation[]>(this.API_URL_STORAGE);
  }
  findAllTypeBill(): Observable<TypeBill[]> {
    return this.httpClient.get<TypeBill[]>(this.API_URL_TYPE_BILL);
  }
  findAllWarehouse(): Observable<WareHouse[]> {
    return this.httpClient.get<WareHouse[]>(this.API_URL_WAREHOUSE);
  }
  findAllTransportation(): Observable<Transportation[]> {
    return this.httpClient.get<Transportation[]>(this.API_URL_TRANS);
  }
  updateBill(post: Bill): Observable<Bill> {
    return this.httpClient.put<Bill>(`${this.API_URL_USER}/${post.id}`, post);
  }
  findByIdBill(id: number): Observable<Bill> {
    return this.httpClient.get<Bill>(this.API_URL_USER + '/' + id);
  }
  findByIdWareHouse(id: number): Observable<WareHouse> {
    return this.httpClient.get<WareHouse>(this.API_URL_WAREHOUSE + '/' + id);
  }
}
