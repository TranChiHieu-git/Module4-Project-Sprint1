import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-home-bakery',
  templateUrl: './home-bakery.component.html',
  styleUrls: ['./home-bakery.component.scss']
})
export class HomeBakeryComponent implements OnInit {
  public productList = [];
  reverse = false;
  key = 'amount_sold';
  p = 1;
  // tslint:disable-next-line:typedef
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProduct().subscribe(next => {
        this.productList = next;
        console.log(this.productList);
      }, error => console.log(error));
  }

  // tslint:disable-next-line:typedef
  sortDataByDateCreate() {
    // this.productService.getAllProductSortByDateCreate().subscribe(next => {
    //   this.productPage = next;
    //   this.productList = next.content;
    //   console.log(this.productPage);
    // }, error => console.log(error));
  }

  // tslint:disable-next-line:typedef
  sortDataByAmountSold() {
    // this.productService.getAllProductSortByAmountSold().subscribe(next => {
    //   this.productList = next;
    //   console.log(this.productList);
    // }, error => console.log(error));
  }
}
