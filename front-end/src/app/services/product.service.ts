import {Injectable} from '@angular/core';
import {Product} from '../models/product';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Pageable} from '../models/pagination/pageable';
import {Page} from '../models/pagination/page';
import {Unit} from '../models/unit';
import {Brand} from '../models/brand';
import {Category} from '../models/category';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const BASE_API_URL = 'http://localhost:8080/warehouse-management';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = BASE_API_URL + '/listProducts';
  private productByIdUrl = BASE_API_URL + '/product/';
  private createUrl = BASE_API_URL + '/create_product';
  private deleteUrl = BASE_API_URL + '/delete_product/';
  private updateUrl = BASE_API_URL + '/update_product/';
  private unitUrl = BASE_API_URL + '/listUnit';
  private categoryUrl = BASE_API_URL + '/listCategory';
  private brandUrl = BASE_API_URL + '/brand';

  constructor(private httpClient: HttpClient) {
  }

  findAllUnit(): Observable<Unit[]> {
    return this.httpClient.get<Unit[]>(this.unitUrl);
  }

  findAllBrand(): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(this.brandUrl);
  }

  findAllCategory(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.categoryUrl);
  }

  getPage(pageable: Pageable): Observable<Page<Product>> {
    const url = this.productUrl
      + '?page=' + pageable.pageNumber
      + '&size=' + pageable.pageSize;
    return this.httpClient.get<Page<Product>>(url, httpOptions);
  }

  findProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.productByIdUrl + id);
  }

  createNew(product: Partial<Product>): Observable<Product> {
    return this.httpClient.post<Product>(this.createUrl, product);
  }

  deleteProduct(product: Product): Observable<Product> {
    return this.httpClient.patch<Product>(this.deleteUrl + product.productId, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.patch<Product>(this.updateUrl + product.productId, product);
  }
}

