import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Order} from '../models/order';
import {TokenStorageService} from '../auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ORDER_API_URL = 'http://localhost:8080/user-order';
  ORDER_DETAIL_API_URL = 'http://localhost:8080/order';
  ORDER_CANCEL_API_URL = 'http://localhost:8080/order-cancel';
  idUserSource = new BehaviorSubject<number>(0);
  curentIdUser = this.idUserSource.asObservable();
  page = new BehaviorSubject<number>(0);
  currentPage = this.page.asObservable();

  httpOptions: any;

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200/', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }
  chanceIdUser(id) {
    this.idUserSource.next(id);
  }
chancePage(page){
    this.page.next(page);
}
  findAllOrderByUserId(id: number): Observable<any> {
    return this.httpClient.get<Order[]>(this.ORDER_API_URL + '/' + id, this.httpOptions);
  }


  findAllOrderByUserIdOnPage(id: number, page: number): Observable<any> {
    return this.httpClient.get<Order[]>(this.ORDER_API_URL + '/' + id + '/?page=' + page + '&size=2', this.httpOptions);
  }

  findOrderById(id: number): Observable<any> {
    return this.httpClient.get<Order>(this.ORDER_DETAIL_API_URL + '/' + id, this.httpOptions);
  }

  cancelOrder(id: number): Observable<Order> {
    return this.httpClient.put<Order>(this.ORDER_CANCEL_API_URL + '/' + id, this.httpOptions);
  }
}
