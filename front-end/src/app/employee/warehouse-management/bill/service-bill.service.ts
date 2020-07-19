import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from './bill';
import {Distributor} from '../../../models/distributor';
import {Employee} from '../../employee';
import {Pay} from '../../../models/pay';
import {StorageLocation} from '../../../models/storage-location';
import {TypeBill} from '../../../models/type-bill';
import {WareHouse} from '../../../models/ware-house';
import {Transportation} from '../../../models/transportation';

@Injectable({
  providedIn: 'root'
})
export class ServiceBillService {
  // API_URL_CREATE = API_URL_USER + '/create_bill';
  API_URL_USER = 'http://localhost:8080/bills';
  API_URL_WAREHOUSE = 'http://localhost:8080/wareHouses/';
  API_URL_TRANS = 'http://localhost:8080/transportations/';
  API_URL_TYPE_BILL = 'http://localhost:8080/typeBills/';
  API_URL_STORAGE = 'http://localhost:8080/storageLocations/';
  API_URL_PAY = 'http://localhost:8080/pays/';
  API_URL_EMPLOYEE = 'http://localhost:8080/employee/list';
  API_URL_DIST = 'http://localhost:8080/dist/list';
  constructor(private httpClient: HttpClient) { }
  create(bill: Partial<Bill>): Observable<Bill> {
    return this.httpClient.post<Bill>(this.API_URL_USER + '/create-bill', bill);
  }
  findAllUser(): Observable<Bill[]> {
    return this.httpClient.get<Bill[]>(this.API_URL_USER);
  }
  findAllDistributors(): Observable<Distributor[]> {
    return this.httpClient.get<Distributor[]>(this.API_URL_DIST);
  }
  findAllEmployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.API_URL_EMPLOYEE);
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
    return this.httpClient.patch<Bill>(this.API_URL_USER + '/update/' + post.id, post);
  }
  findByIdBill(id: number): Observable<Bill> {
    return this.httpClient.get<Bill>(this.API_URL_USER + '/' + id);
  }
  findByIdWareHouse(id: number): Observable<WareHouse> {
    return this.httpClient.get<WareHouse>(this.API_URL_WAREHOUSE + '/' + id);
  }
  deleteById(id: number): Observable<void> {
    // @ts-ignore
    return this.httpClient.patch<void>(this.API_URL_USER + '/delete/' + id);
  }

}
