import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  API_URL = 'http://localhost:8080/user/home-store/all-brand';

  constructor(public httpClient: HttpClient) { }

  getAllBrand(): Observable<any> {
    return this.httpClient.get(this.API_URL);
  }
}
