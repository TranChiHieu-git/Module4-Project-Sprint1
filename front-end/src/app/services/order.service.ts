import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Order} from '../models/order';

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

  constructor(private  httpClient: HttpClient) {
  }

  chanceIdUser(id) {
    this.idUserSource.next(id);
  }
chancePage(page){
    this.page.next(page);
}
  findAllOrderByUserId(id: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.ORDER_API_URL + '/' + id);
  }

  findAllOrderByUserIdOnPage(id: number, page: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.ORDER_API_URL + '/' + id + '/?page=' + page + '&size=2');
  }

  findOrderById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(this.ORDER_DETAIL_API_URL + '/' + id);
  }

  cancelOrder(id: number): Observable<Order> {
    return this.httpClient.put<Order>(this.ORDER_CANCEL_API_URL + '/' + id, null);
  }
}
