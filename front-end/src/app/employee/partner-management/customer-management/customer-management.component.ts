import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnChanges, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {HttpClient} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {} from '../../../../assets/js/fb.js';

declare var $: any;

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit {
  private isSearch = false;
  private editUser: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private http: HttpClient,
              private afStorage: AngularFireStorage) {
  }

  p = 1;
  users: User[];
  tempCustomer: User = new User();
  addUser: FormGroup;
  reverse = false;
  filter;
  date: any;
  deleteList = new Array();
  selectedFile = null;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  editUrl: any;
  uploadStatus = true;
  uploadProgress: any;
  uploadProgressStatus = false;
  size = 5;
  validationMessages = {
    fullName: [
      {type: 'minlength', message: 'Tên nên có ít nhất 5 ký tự'},
      {type: 'maxlength', message: 'Tên có độ dài vượt quá 25 ký tự'},
      {type: 'required', message: 'Tên không được để trống'},
      {type: 'pattern', message: 'Tên không đúng định dạng'}
    ],
    gender: [
      {type: 'required', message: 'Tên của khóa học không được để trống.'},
    ],
    // identityNumber: [
    //   {type: 'required', message: 'Vui lòng nhập vào'},
    //   {type: 'pattern', message: 'Nhập sai định dạng Vd:205443374'}
    // ],
    email: [
      {type: 'required', message: 'Vui lòng nhập vào'},
      {type: 'pattern', message: 'Nhập sai định dạng Vd:caoquochuy21@gmail.com'}
    ],
    phone: [
      {type: 'required', message: 'Vui lòng nhập vào'},
      {type: 'pattern', message: 'Nhập sai định dạng Vd:0908123123'}
    ],
    birthday: [
      {type: 'required', message: 'Vui lòng nhập vào'},
      {type: 'invalid', message: 'Không đủ 18 tuổi'}
    ],
  }
  search = '';
  pageClicked = 0
  pages = [];
  totalPages = 1;

  checkBirthDay(a: FormControl): { invalid: boolean } {
    const v = a.value;
    // console.log(v);
    const birthday: Date = new Date(v);
    const now: Date = new Date();
    // console.log(now);
    const day = birthday.getDay();
    // console.log(day);
    const month = birthday.getMonth();
    const year = birthday.getFullYear();
    const age = now.getFullYear() - year;
    // tslint:disable-next-line:prefer-const
    let ok: boolean;
    if (age < 18) {
      ok = false;
    } else if (age === 18) {
      if (now.getMonth() === month) {
        if (now.getDay() < day) {
          ok = false;
        }
      } else {
        ok = now.getMonth() >= month;
      }
    } else {
      ok = true;
    }
    return ok ? null : {invalid: true};
  }

  ngOnInit(): void {
    this.addUser = this.formBuilder.group({
      userName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern(/^\S+.*\S+$/)
      ])),
      gender: ['', [Validators.required]],
      birthday: new FormControl('', Validators.compose([
        Validators.required,
        this.checkBirthDay,
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?:\\(84\\)\\+|0)9[01]\\d{7}$')
      ])),
      address: ['', [Validators.required]],
      imageUrl: ['']
    });
    this.onSubmit(0);
    $('#checkAll').click(function() {
      $('input:checkbox').not(this).prop('checked', this.checked);
    });
    this.editUser = this.formBuilder.group({
      id: [''],
      userName: ['', [Validators.required, Validators.pattern('[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹế][a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹế ]*')]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('(090|091|\\(84\\)\\+90|\\(84\\)\\+91)[0-9]{7}')]],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]+(\\.?[A-Za-z0-9])*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)')]],
      birthday: [''],
      gender: [''],
      imageUrl: ['']
    });
    // tslint:disable-next-line:only-arrow-functions typedef no-shadowed-variable
    (function($) {
      // tslint:disable-next-line:only-arrow-functions typedef
      $(document).ready(function() {
        // tslint:disable-next-line:only-arrow-functions typedef
        const readURL = function(input) {
          if (input.files && input.files[0]) {
            const reader = new FileReader();

            // tslint:disable-next-line:only-arrow-functions typedef
            reader.onload = function (e) {
              // @ts-ignore
              $('.profile-pic').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
          }
        };

        // tslint:disable-next-line:typedef
        $('#custom-file-input').on('change', function () {
          readURL(this);
        });

        // tslint:disable-next-line:only-arrow-functions typedef
        $('#upload-button').on('click', function () {
          $('#file-upload').click();
        });
      });
    })(jQuery);
    $('.icon-upload-alt').css('opacity', '-1');
    // tslint:disable-next-line:typedef
    $('.button').click(function() {
      const buttonId = $(this).attr('id');
      $('#modal-container').removeAttr('class').addClass(buttonId);
      $('body').addClass('modal-active');
    });

    // tslint:disable-next-line:typedef
    $('#modal-container').click(function () {
      $(this).addClass('out');
      $('body').removeClass('modal-active');
    });

  }


  editModel(element: User): void {
    this.uploadProgressStatus = false;
    this.tempCustomer = element;
    this.change();
    $('#editModal').modal('show');
  }

  deleteModel(element: User): void {
    // this.tempStudent = element;
    // this.change();
    $('#deleteModal').modal('show');
  }

  editcheckModel(element: User): void {
    $('#editcheckModal').modal('show');
  }

  deletecheckModel(element: User): void {
    $('#deletecheckModal').modal('show');
  }


  backMenu(): void {
    $('#addModal').modal('hide');
    $('#addCheckModal').modal('hide');
    $('#editModal').modal('hide');
    $('#DeleteModal').modal('hide');
    $('#editcheckModal').modal('hide');
    $('#deletecheckModal').modal('hide');
  }

  onSubmit(page): void {
    this.userService.getAllUser(page, this.size, this.search).subscribe(
      data => {
       // console.log(data);
        this.pageClicked = page;
        this.users = data.content;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }, error => {
        if (error.status === 401) {
          alert('Bạn không có quyền vào trang này.Mời bạn đăng nhập.');
        }
      }
    );
    if (this.uploadStatus) {
      const editConfirm = confirm('Bạn có chắc chắn cập nhật thông tin của khách mua hàng ?');
      if (editConfirm) {
        if (this.date !== undefined) {
          this.editUser.patchValue({
            birthday: this.date,
          });
        }
        if (this.editUrl !== undefined) {
          this.editUser.patchValue({
            imageUrl: this.editUrl,
          });
        }
        this.userService.editCustomer(this.editUser.value).subscribe(
          next => window.location.reload(),
          error => console.log(error)
        );
      }
    }
  }

  // editSubmit(userName): void {
  //   if (this.uploadStatus){
  //     const editConfirm = confirm('Bạn có chắc chắn cập nhật thông tin của khách mua hàng ' + userName + ' ?');
  //     if (editConfirm) {
  //       if (this.date !== undefined) {
  //         this.editUser.patchValue({
  //           birthday: this.date,
  //         });
  //       }
  //       if (this.editUrl !== undefined) {
  //         this.editUser.patchValue({
  //           imageUrl: this.editUrl,
  //         });
  //       }
  //       this.userService.editCustomer(this.editUser.value).subscribe(
  //         next => window.location.reload(),
  //         error => console.log(error)
  //       );
  //     }
  //   }
  // }
  deleteSubmit(id, userName): void {
    const deleteConfirm = confirm('Bạn có chắc chắn muốn xóa khách mua hàng ' + userName + ' không?');
    if (deleteConfirm) {
      this.userService.deleteCustomerById(id).subscribe(
        next => {
          window.location.reload();
        },
        error => console.log(error)
      );
    }
  }

  change(): void {
    this.editUser.patchValue({
      id: this.tempCustomer.id,
      userName: this.tempCustomer.userName,
      birthday: this.tempCustomer.birthday,
      address: this.tempCustomer.address,
      email: this.tempCustomer.email,
      phone: this.tempCustomer.phone,
      gender: this.tempCustomer.gender,
      imageUrl: this.tempCustomer.imageUrl,
      deleteFlag: this.tempCustomer.deleteFlag,
    });
  }

  addEvent(event): void {
    this.date = event.value;
  }

  quayLaiDanhSach(): void {
    this.router.navigate(['employee/partner-management/customer-management']);
  }

  deleteCheckbox(event, id): void {
    const indexOfId = this.deleteList.indexOf(id);

    if (event.target.checked) {
      if (indexOfId < 0) {
        this.deleteList.push(id);
      }
    } else {
      this.deleteList.splice(indexOfId, 1);
    }
  }

  deleteAllCheckbox(event): void {
    if (event.target.checked) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.users.length; i++) {
        this.deleteList.push(this.users[i].id);
      }
    } else {
      this.deleteList.splice(0, this.deleteList.length);
    }
  }

  delete(): void {
    let deleteConfirm = false;
    if (this.deleteList.length <= 0) {
      alert('Bạn chưa chọn khách hàng nào để tiến hành xóa!');
    } else {
      deleteConfirm = confirm('Bạn có chắc chắn muốn xóa những khách mua hàng này không?');
    }
    if (deleteConfirm) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.deleteList.length; i++) {
        this.userService.deleteCustomerById(this.deleteList[i]).subscribe(
          next => {
          },
          error => console.log(error)
        );
      }
      window.location.reload();
    }
  }

  // tslint:disable-next-line:typedef
  hoverUploadPic() {
    $('.icon-upload-alt').css('opacity', '0.8');
  }


  // tslint:disable-next-line:typedef
  maxDate: any;
  minDate: any;

  leaveUploadPic() {
    $('.icon-upload-alt').css('opacity', '-1');
  }

  selectAvatar(): void {
    $('#myAvatar').click();
    $('#myAvatar1').click();
  }

  readURL(target: any): void {
    this.uploadStatus = false;
    this.uploadProgressStatus = true;
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // @ts-ignore
        $('#avatar').attr('src', e.target.result);
        // $('#avatar1').attr('src', e.target.result);
      };
      reader.readAsDataURL(target.files[0]);
      this.uploadFireBaseAndSubmit();
    } else {
    }
  }

  private uploadFireBaseAndSubmit(): void {
    const target: any = document.getElementById('myAvatar');
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.addUser.patchValue({imageUrl: url});
          $('#image').val(null);
        });
      }))
      .subscribe();
  }

  addCheckModal(): void {
    if (this.addUser.valid) {
      this.userService.addNewUser(this.addUser.value).subscribe(data => {
      });
      $('#addCheckModal').modal('show');
      this.addUser.reset();
    }
  }

  searchName(): void {
    if (this.search === '') {
      this.isSearch = false;
      this.ngOnInit();
    } else {
      this.isSearch = true;
      this.onSubmit(0);
    }
  }

  getSumTotal(arr: User): number {
    let sum = 0;
    console.log(arr.listOrder.length);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arr.listOrder.length; i++) {
      sum += arr.listOrder[i].totalMoney;
    }
    return sum;
  }

  onFirst(): void {
    this.pageClicked = 0;
    this.onSubmit(this.pageClicked);
  }

  onPrevious(): void {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.onSubmit(this.pageClicked);
    }
  }

  onLast(): void {
    this.pageClicked = this.totalPages - 1;
    this.onSubmit(this.pageClicked);
  }

  onNext(): void {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.onSubmit(this.pageClicked);
    }
  }

}
