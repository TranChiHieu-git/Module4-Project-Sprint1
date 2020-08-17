import { Component, OnInit } from '@angular/core';
import {Product} from '../../../models/product';
import {ServiceBillService} from '../../../services/service-bill.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  filter: any;
  products: Product[];
  key = 'name'; // set default
  reverse = false;
  sort(key): void{
    this.key = key;
    this.reverse = !this.reverse;
  }
  constructor(private billService: ServiceBillService) { }

  ngOnInit(): void {
    // this.billService.findAllTop().subscribe(
    //   next => this.products = next,
    //   error => {
    //     this.products = [];
    //     console.log(error);
    //   });
  }
  searchProducts(y: string, m: string): void{
    this.findTop(y, m);
  }
  private findTop(y: string, m: string): void {
    this.billService.findAllTop(y, m).subscribe(
      next => this.products = next,
      error => {
        this.products = [];
        console.log(error);
      });
  }

}
