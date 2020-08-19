import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../auth/token-storage.service';
import {Observable} from 'rxjs';
import {Unit} from '../models/unit';
import {Product} from '../models/product';
import {Coupon} from '../models/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  API_URL = 'http://localhost:8080/coupon';
  API_GET_ALL_PRODUCT = 'http://localhost:8080/coupon/listProducts';
  API_CREATE_COUPON = 'http://localhost:8080/createCoupon';

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {
  }

  getAllCourse(currentPage, size, createDateFrom, createDateTo, employee, customer): Observable<any> {
    return this.httpClient.get(this.API_URL + '?page=' + currentPage + '&size=' + size + '&createdatefrom=' + createDateFrom + '&createdateto=' + createDateTo + '&employee=' + employee + '&user=' + customer);
  }
  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.API_GET_ALL_PRODUCT);
  }

  createNew(coupon: Partial<Coupon>): Observable<Coupon> {
    return this.httpClient.post<Coupon>(this.API_CREATE_COUPON, coupon);
  }
  findCouponById(id: number): Observable<Coupon>{
    return this.httpClient.get<Coupon>(this.API_URL + '/' + id);
  }

  deleteCoupon(coupon: Coupon): Observable<Coupon> {
    return this.httpClient.patch<Coupon>(this.API_URL + '/delete/' + coupon.couponId, coupon);
  }
  deleteManyCoupon(id: number): Observable<void>{
    return this.httpClient.get<void>(this.API_URL + '/deletes/' + id);
  }
}
