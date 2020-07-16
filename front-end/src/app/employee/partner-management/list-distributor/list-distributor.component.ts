import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Distributor} from '../../../models/distributor';
import {DistributorService} from '../../../services/distributor.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
@Component({
  selector: 'app-list-distributor',
  templateUrl: './list-distributor.component.html',
  styleUrls: ['./list-distributor.component.scss']
})
export class ListDistributorComponent implements OnInit {
  distributorList: Distributor[];
  img: any;
  myForm: FormGroup;
  src = 'https://worklink.vn/wp-content/uploads/2018/07/no-logo.png';
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<any>;
  myPromise: any;
  typeOfDistributorPromise: any;
  isChangePic = false;
  myDistributor: Distributor;
  functionTitle: string;
  functionButton: string;
  mode: string;
  constructor(private fb: FormBuilder,
              private distributorService: DistributorService,
              private router: Router, private afStorage: AngularFireStorage) {
    this.myForm = fb.group({
      id: [''],
      name: [''],
      phone: [''],
      email: [''],
      address: [''],
      fax: [''],
      website: [''],
      img: [''],
      typeOfDistributor: ['']
    });
  }
  ngOnInit(): void {
    this.distributorService.findAll().subscribe(
      next => this.distributorList = next,
      error => {
        this.distributorList = [];
        console.log(error);
      }
    );
    // tslint:disable-next-line:only-arrow-functions
    (function($) {
      // tslint:disable-next-line:only-arrow-functions
      $(document).ready(function() {
        // tslint:disable-next-line:only-arrow-functions
        const readURL = function(input) {
          if (input.files && input.files[0]) {
            const reader = new FileReader();
            // tslint:disable-next-line:only-arrow-functions
            reader.onload = function(e) {
              // @ts-ignore
              $('.profile-pic').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
          }
        };
        $('.file-upload').on('change', function() {
          readURL(this);
        });
        // tslint:disable-next-line:only-arrow-functions
        $('.upload-button').on('click', function() {
          $('.file-upload').click();
        });
      });
    })(jQuery);
    // Thach
    $('.icon-upload-alt').css('opacity', '-1');
    $('.button').click(function() {
      const buttonId = $(this).attr('id');
      $('#modal-container').removeAttr('class').addClass(buttonId);
      $('body').addClass('modal-active');
    });
    $('#modal-container').click(function() {
      $(this).addClass('out');
      $('body').removeClass('modal-active');
    });
  }
  // tslint:disable-next-line:typedef
  onSubmit() {
    if (this.myForm.valid) {
      if (this.mode === 'create') {
        if (this.myForm.valid) {
          if (this.isChangePic) {
            this.uploadFireBaseAndSubmit();
          }
        } else {
          alert('Invalid');
        }
      } else if (this.mode === 'edit') {
        this.updateDistributor();
      }
    } else {
      this.showNotications('Vui lòng kiểm tra lại các trường');
    }
  }
  updateDistributor(): void {
    if (this.isChangePic) {
      this.uploadFireBaseAndSubmit();
    } else {
      this.submitForm();
    }
  }
  private submitForm(): void {
    $('#closeEditForm').click();
    this.distributorService.create(this.myForm.value).subscribe(
      res => {
        let notication = '';
        if (this.mode === 'create') {
          notication = 'Thêm mới thành công';
        } else {
          notication = ' Chỉnh sửa thành công';
        }
        this.showNotications(notication);
        this.myForm.reset();
        this.resetList();
        $('#closeForm').click();
      },
      error => {
        let notication = '';
        if (this.mode === 'create') {
          notication = 'Thêm mới thất bại';
        } else {
          notication = ' Chỉnh sửa thất bại';
        }
        this.showNotications(notication);
      }
    );
  }
// FUNTION PHU
  // tslint:disable-next-line:typedef
  hoverUploadPic() {
    $('.icon-upload-alt').css('opacity', '0.8');
  }
  // tslint:disable-next-line:typedef
  leaveUploadPic() {
    $('.icon-upload-alt').css('opacity', '-1');
  }
  // tslint:disable-next-line:typedef
  selectAvatar() {
    $('#myAvatar').click();
  }
  // tslint:disable-next-line:typedef
  readURL(target: any) {
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        $('#avatar').attr('src', e.target.result);
      };
      reader.readAsDataURL(target.files[0]);
      this.isChangePic = true;
    } else {
    }
  }
  private uploadFireBaseAndSubmit(): void {
    const target: any = document.getElementById('myAvatar');
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(target.files[0]);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.downloadURL = url; // <-- do what ever you want with the url..
          this.myPromise = new Promise((resolve, reject) => {
            resolve(url);
            this.myForm.value.img = url;
            this.typeOfDistributorPromise.then((value) => {
              this.myForm.value.typeOfDistributor = value;
              this.submitForm();
            });
          });
        });
      }))
      .subscribe();
  }
// tslint:disable-next-line:typedef
  chooseAll(item: HTMLInputElement) {
    if ($('#box-1').prop('checked')) {
      $('#box-2, #box-3').prop('checked', true);
      this.distributorService.findByName('Tất cả').subscribe(
        res => this.typeOfDistributorPromise = new Promise(resolve => resolve(res)),
        error => console.log(error)
      );
    } else {
      $('#box-2, #box-3').prop('checked', false);
      this.myForm.value.typeOfDistributor = '';
    }
  }
  // tslint:disable-next-line:typedef
  chooseOne(target: HTMLInputElement) {
    if ($('#box-2').is(':checked') && $('#box-3').is(':checked')) {
      $('#box-1').prop('checked', true);
      this.distributorService.findByName('Tất cả').subscribe(
        res => this.typeOfDistributorPromise = new Promise(resolve => resolve(res)),
        error => console.log(error)
      );
    } else if ($('#box-2').is(':checked')) {
      $('#box-1').prop('checked', false);
      this.distributorService.findByName('Bánh').subscribe(
        res => {
          this.typeOfDistributorPromise = new Promise(resolve => resolve(res));
        },
        error => console.log(error)
      );
    } else {
      $('#box-1').prop('checked', false);
      this.distributorService.findByName('Kẹo').subscribe(
        res => {
          this.typeOfDistributorPromise = new Promise(resolve => resolve(res));
        },
        error => console.log(error)
      );
    }
  }
  // tslint:disable-next-line:typedef
  openEditForm(id: number) {
    this.mode = 'edit';
    this.functionTitle = 'CHỈNH SỬA NHÀ PHÂN PHỐI';
    this.functionButton = 'SỬA';
    this.isChangePic = false;
    this.distributorService.findById(id).subscribe(
      res => {
        this.myForm.patchValue(res);
        if (this.myForm.value.img !== '') {
          this.src = this.myForm.value.img;
        }
        switch (this.myForm.value.typeOfDistributor.name) {
          case 'Tất cả' : {
            $('#box-2, #box-3,#box-1').prop('checked', true);
            break;
          }
          case 'Bánh': {
            $('#box-2').prop('checked', true);
            $('#box-1,#box-3').prop('checked', false);
            break;
          }
          case 'Kẹo' : {
            $('#box-3').prop('checked', true);
            $('#box-1,#box-2').prop('checked', false);
            break;
          }
        }
      },
      error => console.log(error)
    );
    $('#btn-editForm').click();
  }
  openDeleteForm(id: number): void {
    $('#deleteForm').click();
    this.distributorService.findById(id).subscribe(
      res => {
        this.myDistributor = res;
      },
      error => console.log(error)
    );
  }
  deleteDistrinbutor(id: number): void {
    this.myDistributor.deleted = false;
    this.distributorService.create(this.myDistributor).subscribe(
      res => {
        this.showNotications('Xóa nhà phân phối thành công');
        this.resetList();
        $('#closeDeleteForm').click();
      },
      error => {
        this.showNotications('Xóa nhà phân phối thất bại');
      }
    );
  }
  showNotications(mess: string): void {
    let x = document.getElementById('snackbar');
    x.textContent = '';
    x.append(mess);
    // Add the "show" class to DIV
    x.className = 'showSnackbar';
    // After 3 seconds, remove the show class from DIV
    setTimeout(() => {
      x.className = x.className.replace('show', '');
    }, 3000);
  }
  openCreateForm(): void {
    $('#box-2, #box-3,#box-1').prop('checked', false);
    this.src = 'https://worklink.vn/wp-content/uploads/2018/07/no-logo.png';
    this.mode = 'create';
    this.myForm.reset();
    console.log(this.myForm.value);
    console.log(this.src);
    this.functionTitle = 'THÊM MỚI NHÀ PHÂN PHỐI';
    this.functionButton = 'THÊM';
    $('#createForm').click();
  }
  resetList(): void {
    this.distributorService.findAll().subscribe(
      res => {
        this.distributorList = res;
        this.router.navigate(['employee/partner-management/list-distributor']);
      },
      error => {
      }
    );
  }
}