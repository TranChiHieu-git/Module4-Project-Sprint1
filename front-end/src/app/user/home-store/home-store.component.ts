import {Component, OnInit} from '@angular/core';
import {BrandService} from '../../services/brand.service';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-home-store',
  templateUrl: './home-store.component.html',
  styleUrls: ['./home-store.component.scss']
})
export class HomeStoreComponent implements OnInit {

  brandList = [];
  categoryList = [];

  constructor(public brandService: BrandService,
              public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(next => {
      this.categoryList = next;
      console.log(this.categoryList);
    },
      error => console.log(error));
    this.brandService.getAllBrandToOption().subscribe(next => this.brandList = next, error => console.log(error));
  }
}
