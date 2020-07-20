import * as $ from 'jquery';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Brand} from '../../../models/brand';
import {BrandService} from '../../../services/brand.service';

@Component({
  selector: 'app-brand-management',
  templateUrl: './brand-management.component.html',
  styleUrls: ['./brand-management.component.scss']
})
export class BrandManagementComponent implements OnInit {
  imgSrc = 'https://via.placeholder.com/150';
  selectedImage: any = null;
  downloadURL: Observable<string>;
  brandForm: FormGroup;
  brand: Brand;
  brandList: Brand[];
  size = 3;
  pageClick = 0;
  pages = [];
  totalPages = 1;
  search = '';
  isSearch = false;
  key = '';
  reverse = false;
  brandName: string;
  brandEditForm: FormGroup;
  constructor(
    private brandService: BrandService,
    private fb: FormBuilder,
    private storage: AngularFireStorage
  ) {
    this.brandForm = this.fb.group({
      brandLogo: [''],
      brandName: ['', Validators.required],
      brandAddress: ['', Validators.required],
      brandWebsite: ['', Validators.required]
    });
    this.brandEditForm = this.fb.group({
      id: [''],
      brandLogo: ['', Validators.required],
      brandName: ['', Validators.required],
      brandAddress: ['', Validators.required],
      brandWebsite: ['', Validators.required]
    });
  }

  getAllBrand(): void {
    this.onSubmit(0);
  }

  ngOnInit(): void {
    this.getAllBrand();
  }
  sort(key): void {
    this.key = key;
    this.reverse = !this.reverse;
  }
  onNext(): void {
    if (this.pageClick < this.totalPages - 1) {
      this.pageClick++;
      this.onSubmit(this.pageClick);
    }
  }

  onPrevious(): void {
    if (this.pageClick > 0) {
      this.pageClick--;
      this.onSubmit(this.pageClick);
    }
  }

  onFirst(): void {
    this.pageClick = 0;
    this.onSubmit(this.pageClick);
  }

  onLast(): void {
    this.pageClick = this.totalPages - 1;
    this.onSubmit(this.pageClick);
  }

  onSubmit(page): void {
    this.brandService.getAllBrand(page, this.size, this.search).subscribe(
      next => {
        // console.log(next);
        this.pageClick = page;
        this.brandList = next.content;
        this.totalPages = next.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      },
      error => console.log(error)
    );
  }

  searchName(): void {
    const temp = '';
    if (this.search === temp) {
      this.isSearch = false;
      this.ngOnInit();
    } else {
      this.isSearch = true;
      this.onSubmit(0);
    }
  }

  addNewBrand(): void {
    if (this.brandForm.valid) {
      this.brandService.createBrand(this.brandForm.value).subscribe(
        next => {
          alert('New brand has been added!');
          window.location.reload();
        },
        error => console.log(error),
      );
    } else {
      alert('Please enter information!');
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      const time = Date.now();
      const filePath = `BrandLogo/${this.selectedImage.name}_${time}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`BrandLogo/${this.selectedImage.name}_${time}`, this.selectedImage);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              if (url) {
                this.imgSrc = url;
              }
              console.log(this.imgSrc);
            });
          })
        )
        .subscribe(url => {
          if (url) {
            console.log(url);
          }
        });
    } else {
      this.imgSrc = 'https://via.placeholder.com/150';
      this.selectedImage = null;
    }
  }

  catchBrandId(id: number): void {
    this.brandService.findById(id).subscribe(
      res => {
        this.brand = res;
        this.brandName = res.brandName;
        this.brandEditForm.patchValue(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  editId(id: number): void {
    this.brandService.findById(id).subscribe(
      next => {
        this.brandEditForm.patchValue(next);

      }
    );
  }

  // tslint:disable-next-line:typedef
  edit() {
    console.log(this.brandForm.value);
    this.brandService.editBrand(this.brandEditForm.value).subscribe(
      next => {
        alert('Thay đổi thành công');
      },
      error => console.log(error));
  }

  delete(): void {
    this.brandService.deleteBrand(this.brand).subscribe(
      next => {
        this.ngOnInit();
        $('#close').click();
      },
      error => {
        console.log(error);
      }
    );
  }
  switchEdit(brand: Brand): void {
    brand.isEditable = !brand.isEditable;
    $('#submit' + brand.id).click();
  }
}
