import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from '../../../../services/product.service';

@Component({
  selector: 'app-list-general-hai',
  templateUrl: './list-general-hai.component.html',
  styleUrls: ['./list-general-hai.component.scss']
})
export class ListGeneralHaiComponent implements OnInit {
  constructor(private configCake: NgbCarouselConfig,
              private productService: ProductService) {
    configCake.interval = 2000;
    configCake.wrap = true;
    configCake.keyboard = false;
    configCake.pauseOnHover = false;
  }

  cakeList = [];
  cakeListFormatted = [];

  ngOnInit(): void {
    this.productService.getAllProductByCategoryAndDeleteFlag(1).subscribe(next => {
        this.cakeList = next;
        this.formatListCake();
        console.log(next);
        console.log(this.cakeListFormatted);
      },
      error => console.log(error));
  }

  formatListCake(): void {
    let j = -1;

    for (let i = 0; i < this.cakeList.length; i++) {
      if (i % 4 === 0) {
        j++;
        this.cakeListFormatted[j] = [];
        this.cakeListFormatted[j].push(this.cakeList[i]);
      } else {
        this.cakeListFormatted[j].push(this.cakeList[i]);
      }
    }
  }
}
