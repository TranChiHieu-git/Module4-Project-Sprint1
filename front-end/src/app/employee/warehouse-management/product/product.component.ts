import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Product} from '../../../models/product';
import {ProductService} from '../../../services/product.service';
import {Page} from '../../../models/pagination/page';
import {CustomPaginationService} from '../../../services/pagination/custom-pagination.service';
import {Unit} from '../../../models/unit';
import {Brand} from '../../../models/brand';
import {Category} from '../../../models/category';

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
  key = 'productName';

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private paginationService: CustomPaginationService) {
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productId: [''],
      productName: [''],
      price: [''],
      expiryDate: [''],
      quantity: [''],
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

    this.createProductForm = this.fb.group({
      productName: [''],
      price: [''],
      expiryDate: [''],
      quantity: [''],
      deleteFlag: [0],
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
        this.getUnit();
        this.getBrand();
        this.getCategory();
        this.productForm.patchValue(next);
      },
      error => console.log('error'));
  }

  onSubmitEdit(): void {
    this.productService.updateProduct(this.productForm.value).subscribe(
      next => {
        this.closeEditModal.nativeElement.click();
        this.getData();
      },
      error => console.log(error));
  }

  onCreate(): void {
    console.log(this.createProductForm.value);
    this.productService.createNew(this.createProductForm.value).subscribe(
      next => {
        this.closeCreateModal.nativeElement.click();
        this.productForm.reset();
        this.getData();
      },
      error => console.log(error));
  }

  deleteProduct(id: number): void {
    this.productService.findProductById(id).subscribe(next => {
      this.productName = next.productName;
      this.product = next;
    });
  }

  OnDelete(): void {
    this.productService.deleteProduct(this.product).subscribe(
      next => {
        this.closeDeleteModal.nativeElement.click();
        this.getData();
      },
      error => console.log(error)
    );
  }
}
