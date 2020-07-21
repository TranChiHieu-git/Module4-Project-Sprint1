import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../models/product';
import {ProductService} from '../../../services/product.service';
import {Page} from '../../../models/pagination/page';
import {CustomPaginationService} from '../../../services/pagination/custom-pagination.service';
import {Unit} from '../../../models/unit';
import {Brand} from '../../../models/brand';
import {Category} from '../../../models/category';
import {NotificationService} from '../../../services/notification.service';

declare const dataTable: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild('closeEditModal') closeEditModal;
  @ViewChild('closeCreateModal') closeCreateModal;
  @ViewChild('closeDeleteModal') closeDeleteModal;
  page: Page<Product> = new Page();
  productForm: FormGroup;
  createProductForm: FormGroup;
  product: Product;
  unitList: Unit[];
  categoryList: Category[];
  brandList: Brand[];
  public productName;
  key: string;
  reverse = false;

  public minDate = new Date();

  searchProductName: string;


  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private paginationService: CustomPaginationService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {

    this.productForm = this.fb.group({
      productId: [''],
      productName: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*[1-9][0-9]*$')]],
      expiryDate: [''],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]*[1-9][0-9]*$')]],
      deleteFlag: [''],
      category: this.fb.group({
        categoryId: [''],
        categoryName: ['']
      }),
      unit: this.fb.group({
        unitId: [''],
        unitName: ['']
      }),
      brand: this.fb.group({
        id: [''],
        brandName: ['']
      }),
      imageUrl: [''],
    });

    this.initCreateForm();
    this.getData();
    this.getUnit();
    this.getBrand();
    this.getCategory();
  }
  private getData(): void {
    this.productService.getPage(this.page.pageable)
      .subscribe(page => {
        this.page = page;
      });
  }

  private getUnit(): void {
    this.productService.findAllUnit().subscribe(data => {
      this.unitList = data;
    });
  }

  private getCategory(): void {
    this.productService.findAllCategory().subscribe(data => {
      this.categoryList = data;
    });
  }

  private getBrand(): void {
    this.productService.findAllBrand().subscribe(data => {
      this.brandList = data;
    });
  }

  public getNextPage(): void {
    this.page.pageable = this.paginationService.getNextPage(this.page);
    this.getData();
  }

  public getPreviousPage(): void {
    this.page.pageable = this.paginationService.getPreviousPage(this.page);
    this.getData();
  }

  public getPageInNewSize(pageSize: number): void {
    this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
    this.getData();
  }

  editProduct(id: number): void {
    this.productService.findProductById(id).subscribe(next => {
         console.log(next);
         this.productForm.patchValue(next);
         $('#edit1').click();
      },
      error => {this.notificationService.edit('Mặt hàng này đã bị xóa');
                this.getData();
    });
  }

  onSubmitEdit(): void {
    if (this.productForm.valid){
      this.productService.updateProduct(this.productForm.value).subscribe(
        next => {
          this.closeEditModal.nativeElement.click();
          this.notificationService.edit('Chỉnh sửa thành công');
          this.getData();
        },
        error => console.log(error));
    }
  }

  onCreate(): void {
    this.productService.createNew(this.createProductForm.value).subscribe(
      next => {
        this.closeCreateModal.nativeElement.click();
        this.notificationService.create('Tạo mới thành công');
        // this.createProductForm.reset();
        this.initCreateForm();
        this.getData();
      },
      error => console.log(error));
  }

  deleteProduct(id: number): void {
    this.productService.findProductById(id).subscribe(next => {
      this.productName = next.productName;
      this.product = next;
      $('#delete1').click();
    },
      error =>  {this.notificationService.edit('Mặt hàng này đã bị xóa');
                 this.getData();
      });
  }

  OnDelete(): void {
    this.productService.deleteProduct(this.product).subscribe(
      next => {
        this.closeDeleteModal.nativeElement.click();
        this.notificationService.delete('Xóa thành công');
        this.getData();
      },
      error => console.log(error)
    );
  }

  OnCancelCreateForm(): void {
    // this.closeCreateModal.nativeElement.click();
    this.initCreateForm();
  }

  OnCancelEditForm(): void {
    // this.closeCreateModal.nativeElement.click();
    this.productForm.reset();
  }

  sort(key): void {
    this.key = key;
    this.reverse = !this.reverse;
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
}
