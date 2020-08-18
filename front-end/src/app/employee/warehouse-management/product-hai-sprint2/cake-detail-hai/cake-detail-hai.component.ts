import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../../services/product.service';
import {NotificationService} from '../../../../services/notification.service';
import {Product} from '../../../../models/product';
import {Unit} from '../../../../models/unit';
import {Category} from '../../../../models/category';
import {Brand} from '../../../../models/brand';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-cake-detail-hai',
  templateUrl: './cake-detail-hai.component.html',
  styleUrls: ['./cake-detail-hai.component.scss']
})
export class CakeDetailHaiComponent implements OnInit {
  @ViewChild('closeEditModal') closeEditModal;
  @ViewChild('closeCreateModal') closeCreateModal;
  @ViewChild('closeDeleteModal') closeDeleteModal;
  isEditable = false;
  productForm: FormGroup;
  product: Product;
  productId;
  unitList: Unit[];
  categoryList: Category[];
  brandList: Brand[];
  public productName;
  key: string;
  reverse = false;
  public minDate = new Date();
  searchProductName: string;
  listBrand: any;
  brandArray = [];
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  src: any;
  url: any;
  uploadStatus = true;
  uploadProgressStatus = false;
  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private notificationService: NotificationService,
              public activatedRoute: ActivatedRoute,
              private afStorage: AngularFireStorage,
              private router: Router) { }

  ngOnInit(): void {
    // // data tam
    // this.productService.getProductById(1).subscribe(next => {
    //   this.product = next;
    //   this.productForm.patchValue(this.product);
    // });
    this.activatedRoute.params.subscribe(data => this.productId = data.id);
    this.productService.getProductById(this.productId).subscribe(next => {
      this.product = next;
      this.productForm.patchValue(this.product);
    });
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
      infor: ['']
    });
    this.getUnit();
    this.getBrand();
    this.getCategory();
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
  onSubmitEdit(): void {
    this.productForm.patchValue({
      imageUrl: this.src
    });
    if (this.productForm.valid) {
      this.productService.updateProduct(this.productForm.value).subscribe(
        next => {
          this.uneditable();
          this.notificationService.edit('Chỉnh sửa thành công');
        },
        error => console.log(error));
    }
  }
  OnDelete(): void {
    this.productService.deleteProduct(this.product).subscribe(
      next => {
        this.closeDeleteModal.nativeElement.click();
        this.router.navigate(['/employee/warehouse-management/product-hai-sprint2/list-cake-hai']);
        this.notificationService.delete('Xóa thành công');
      },
      error => console.log(error)
    );
  }

  editable(): void {
    this.isEditable = true;
  }

  uneditable(): void {
    this.isEditable = false;
    this.ngOnInit();
  }
  private uploadFireBaseAndSubmit(): void {
    const target: any = document.getElementById('image');
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(target.files[0]);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.src = url;
        });
      }))
      .subscribe();
  }
  selectFile(): void {
    $('#image').click();
  }

  readURL(target: EventTarget & HTMLInputElement): void {
    this.uploadStatus = false;
    this.uploadProgressStatus = true;
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // @ts-ignore
        $('#avatar').attr('src', e.target.result);
      };
      reader.readAsDataURL(target.files[0]);
      this.uploadFireBaseAndSubmit();
    }
  }
}
