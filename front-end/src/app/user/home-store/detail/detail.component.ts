import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  product;

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
  }

}
