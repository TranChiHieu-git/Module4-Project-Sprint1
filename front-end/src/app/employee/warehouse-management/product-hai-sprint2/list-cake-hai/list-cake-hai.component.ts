import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../../../services/product.service';
import {Product} from '../../../../models/product';
import {NotificationService} from '../../../../services/notification.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Unit} from '../../../../models/unit';
import {Category} from '../../../../models/category';
import {Brand} from '../../../../models/brand';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CreateProductHaiComponent} from '../create-product-hai/create-product-hai.component';
import {DeleteProductHaiComponent} from '../delete-product-hai/delete-product-hai.component';

@Component({
  selector: 'app-list-cake-hai',
  templateUrl: './list-cake-hai.component.html',
  styleUrls: ['./list-cake-hai.component.scss']
})
export class ListCakeHaiComponent implements OnInit {
  @ViewChild('closeDeleteModal') closeDeleteModal;
  @ViewChild('closeCreateModal') closeCreateModal;
  cakeList = [];
  reverse = false;
  key = 'amount_sold';
  p = 1;
  product: Product;
  public productName;
  createProductForm: FormGroup;
  unitList: Unit[];
  categoryList: Category[];
  brandList: Brand[];
  // tslint:disable-next-line:typedef
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  constructor(private productService: ProductService,
              private notificationService: NotificationService,
              private fb: FormBuilder,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.productService.getAllProductByCategoryAndDeleteFlag(1).subscribe(next => {
      this.cakeList = next;
      console.log(next);
      },
      error => console.log(error));
    this.getUnit();
    this.getBrand();
  }

  OnDelete(): void {
    this.productService.deleteProduct(this.product).subscribe(
      next => {
        this.closeDeleteModal.nativeElement.click();
        this.notificationService.delete('Xóa thành công');
      },
      error => console.log(error)
    );
  }

  deleteProduct(id: any): void {
    this.productService.findProductById(id).subscribe(next => {

        this.productName = next.productName;
        this.product = next;
        $('#delete1').click();
      },
      error => {
        this.notificationService.edit('Mặt hàng này đã bị xóa');
        // this.getData();
      });
  }
  initCreateForm(): void {
    this.createProductForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*[1-9][0-9]*$')]],
      expiryDate: [''],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]*[1-9][0-9]*$')]],
      deleteFlag: [0],
      category: this.fb.group({
        categoryId: ['']
      }),
      unit: this.fb.group({
        unitId: ['']
      }),
      brand: this.fb.group({
        id: ['']
      }),
      imageUrl: ['']
    });
  }
  onCreate(): void {
    this.productService.createNew(this.createProductForm.value).subscribe(
      next => {
        this.closeCreateModal.nativeElement.click();
        this.notificationService.create('Tạo mới thành công');
        this.createProductForm.reset();
        this.initCreateForm();
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
  OnCancelCreateForm(): void {
    this.closeCreateModal.nativeElement.click();
    this.initCreateForm();
  }

  openDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      brandList: this.brandList,
      unitList: this.unitList
    };

    const dialogRef = this.dialog.open(CreateProductHaiComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      val => this.ngOnInit()
    );
  }
  deleteDialog(id): void {
    // this.productService.findProductById(id).subscribe(next => {
    //
    //     this.productName = next.productName;
    //     this.product = next;
    //     $('#delete1').click();
    //   },
    //   error => {
    //     this.notificationService.edit('Mặt hàng này đã bị xóa');
    //     // this.getData();
    //   });
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id
    };

    const dialogRef = this.dialog.open(DeleteProductHaiComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      val => this.ngOnInit()
    );
  }
}
