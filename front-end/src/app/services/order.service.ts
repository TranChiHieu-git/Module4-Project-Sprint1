import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Order} from '../models/order';
import {TokenStorageService} from '../auth/token-storage.service';
import {Customer} from '../models/customer';
import {OrderDetail} from '../models/order-detail';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ORDER_API_URL = 'http://localhost:8080/user-order';
  ORDER_DETAIL_API_URL = 'http://localhost:8080/order';
  ORDER_CANCEL_API_URL = 'http://localhost:8080/order-cancel';
  ORDER_CREATE_API_URL = 'http://localhost:8080/order-create';
  ORDER_DETAIL_CREATE_API_URL = 'http://localhost:8080/order-detail-create';
  idUserSource = new BehaviorSubject<number>(0);
  currentIdUser = this.idUserSource.asObservable();
  customerSource = new BehaviorSubject<Customer>(null);
  currentCustomer = this.customerSource.asObservable();
  page = new BehaviorSubject<number>(0);
  currentPage = this.page.asObservable();
  order = new BehaviorSubject<Order>(null);
  currentOrder = this.order.asObservable();
  httpOptions: any;

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: `Bearer ` + this.tokenStorage.getToken()})
      , 'Access-Control-Allow-Origin': 'http://localhost:4200/', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  chanceIdUser(id): void {
    this.idUserSource.next(id);
  }

  chanceCustomer(customer): void {
    this.customerSource.next(customer);
  }

  chancePage(page): void {
    this.page.next(page);
  }

  chanceOrder(order): void {
    this.order.next(order);
  }

  findAllOrderByUserId(id: number): Observable<any> {
    return this.httpClient.get<Order[]>(this.ORDER_API_URL + '/' + id, this.httpOptions);
  }


  findAllOrderByUserIdOnPage(id: number, page: number): Observable<any> {
    return this.httpClient.get<Order[]>(this.ORDER_API_URL + '/' + id + '/?page=' + page + '&size=5', this.httpOptions);
  }

  findOrderById(id: number): Observable<any> {
    return this.httpClient.get<Order>(this.ORDER_DETAIL_API_URL + '/' + id, this.httpOptions);
  }

  cancelOrder(id: number): Observable<Order> {
    return this.httpClient.put<Order>(this.ORDER_CANCEL_API_URL + '/' + id, this.httpOptions);
  }

  createOrder(myOrder: Order): Observable<any> {
    return this.httpClient.post<Order>(this.ORDER_CREATE_API_URL, myOrder, this.httpOptions);
  }

  createOrderDetail(orderDetail: OrderDetail): Observable<any> {
    return this.httpClient.post<OrderDetail>(this.ORDER_DETAIL_CREATE_API_URL, orderDetail, this.httpOptions);
  }
}
