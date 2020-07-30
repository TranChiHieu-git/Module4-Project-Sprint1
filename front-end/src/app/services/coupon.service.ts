import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../auth/token-storage.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  API_URL = 'http://localhost:8080/coupon';

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {
  }

  getAllCourse(currentPage, size, createDateFrom, createDateTo, employee, customer): Observable<any> {
    return this.httpClient.get(this.API_URL + '?page=' + currentPage + '&size=' + size + '&createdatefrom=' + createDateFrom + '&createdateto=' + createDateTo + '&employee=' + employee + '&user=' + customer);
  }
}
