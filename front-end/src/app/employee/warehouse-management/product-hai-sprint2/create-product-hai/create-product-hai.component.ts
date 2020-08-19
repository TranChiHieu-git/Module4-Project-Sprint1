import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Unit} from '../../../../models/unit';
import {Category} from '../../../../models/category';
import {Brand} from '../../../../models/brand';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProductService} from '../../../../services/product.service';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-create-product-hai',
  templateUrl: './create-product-hai.component.html',
  styleUrls: ['./create-product-hai.component.scss']
})
export class CreateProductHaiComponent implements OnInit {
  createProductForm: FormGroup;
  unitList: Unit[];
  brandList: Brand[];
  categoryList: Category[];
  category: Category;
  constructor(private fb: FormBuilder,
              public productService: ProductService,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<CreateProductHaiComponent>,
              @Inject(MAT_DIALOG_DATA) {brandList, unitList}) {
    this.unitList = unitList;
    this.brandList = brandList;
    this.createProductForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*[1-9][0-9]*$')]],
      expiryDate: [''],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]*[1-9][0-9]*$')]],
      deleteFlag: [0],
      unit: this.fb.group({
        unitId: ['']
      }),
      brand: this.fb.group({
        id: ['']
      }),
      imageUrl: [''],
      category: this.fb.group({
        categoryId: [''],
        categoryName: ['']
      }),
    });
  }

  ngOnInit(): void {
    this.getCategory();
    this.category = this.categoryList[0];
  }
  onCreate(): void {
    this.createProductForm.patchValue({
      category: {
        categoryId: 1,
        categoryName: 'Bánh'
      }
    });
    this.productService.createNew(this.createProductForm.value).subscribe(
      next => {
        this.close();
        this.notificationService.create('Tạo mới thành công');
        this.createProductForm.reset();
        this.ngOnInit();
        // this.getData();
      },
      error => console.log(error));
  }
  private getUnit(): void {
    this.productService.findAllUnit().subscribe(data => {
      this.unitList = data;
    });
  }

  private getBrand(): void {
    this.productService.findAllBrand().subscribe(data => {
      this.brandList = data;
    });
  }
  private getCategory(): void {
    this.productService.findAllCategory().subscribe(data => {
      this.categoryList = data;
    });
  }
  close(): void {
    this.dialogRef.close();
  }



}
