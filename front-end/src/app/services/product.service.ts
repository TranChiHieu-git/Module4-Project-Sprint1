import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_URL = 'http://localhost:8080/user/home-store';

  constructor(private httpClient: HttpClient) { }

  getAllProduct(): Observable<any> {
    return this.httpClient.get(this.API_URL + '/products');
  }

  getAllProductByCategory(categoryId: number): Observable<any> {
    return this.httpClient.get(this.API_URL + '/' + categoryId);
  }

  getProductById(productId: number): Observable<any> {
    return this.httpClient.get(this.API_URL + '/products/' + productId);
  }
}
