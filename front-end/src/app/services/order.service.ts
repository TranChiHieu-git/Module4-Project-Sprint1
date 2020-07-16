import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ORDER_API_URL = 'http://localhost:8081/user-order';
  ORDER_DETAIL_API_URL = 'http://localhost:8081/order';
  ORDER_CANCEL_API_URL = 'http://localhost:8081/order-cancel';

  constructor(private  httpClient: HttpClient) {
  }

  findAllOrderByUserId(id: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.ORDER_API_URL + '/' + id);
  }

  findOrderById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(this.ORDER_DETAIL_API_URL + '/' + id);
  }

  cancelOrder(id: number): Observable<Order> {
    return this.httpClient.put<Order>(this.ORDER_CANCEL_API_URL + '/' + id, null);
  }
}
