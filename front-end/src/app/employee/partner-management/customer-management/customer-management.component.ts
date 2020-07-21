import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnChanges, OnInit} from '@angular/core';
import {CustomerService} from '../../../services/customer.service';
import {Customer} from '../../../models/customer';
import {HttpClient} from '@angular/common/http';
import {finalize, map} from 'rxjs/operators';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {} from '../../../../assets/js/fb.js';
import {ToastrService} from "ngx-toastr";
import {OrderService} from "../../../services/order.service";
import {Order} from "../../../models/order";

declare var $: any;

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit {
  p = 1;
  customers: Customer[];
  tempCustomer: Customer = new Customer();
  addUser: FormGroup;
  customer = new Customer();
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
  percentUpload: any;
  curentDay = new Date();
  maxDate = new Date();
  minDate = new Date();
  orders: Order[];
  deleteCheckOrderValue = ['Giao hàng thành công', 'Đã hủy'];
  dateRequired = false;
  dateRegex = false;
  dateOutRange = false;
  edited = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private customerService: CustomerService,
              private http: HttpClient,
              private afStorage: AngularFireStorage,
              private toastr: ToastrService,
              private orderService: OrderService) {
  }

  validatingForm: FormGroup;

  ngOnInit(): void {
    this.customerService.getAllCustomer().subscribe((data: any) => {
        this.customers = data.content;
        for (let i=0;i<this.customers.length;i++){
          this.edited[i] = this.customers[i].id;
        }
      }, error => {
        console.log(error);
      }, () => {
      }
    );
    this.maxDate.setFullYear(this.curentDay.getFullYear() - 2);
    this.minDate.setFullYear(this.curentDay.getFullYear() - 120);

    $('#checkAll').click(function () {
      $('input:checkbox').not(this).prop('checked', this.checked);
    });
    this.addUser = this.formBuilder.group({
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
    (function ($) {
      // tslint:disable-next-line:only-arrow-functions typedef
      $(document).ready(function () {
        // tslint:disable-next-line:only-arrow-functions typedef
        const readURL = function (input) {
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
    $('.button').click(function () {
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


  editModel(element: Customer): void {
    this.uploadProgressStatus = false;
    this.tempCustomer = element;
    this.change();
    $('#editModal').modal('show');
  }


  backMenu(): void {
    $('#addModal').modal('hide');
    $('#addCheckModal').modal('hide');
    $('#editModal').modal('hide');
    $('#DeleteModal').modal('hide');
    $('#editcheckModal').modal('hide');
    $('#deletecheckModal').modal('hide');
  }


  addModel(): void {
    $('#addModal').modal('show');
  }


  addCheckModel(element: Customer): void {
    $('#addCheckModal').modal('show');
  }


  // tslint:disable-next-line:typedef
  onSubmit() {
    if (this.uploadStatus) {
      const editConfirm = confirm('Bạn có chắc chắn cập nhật thông tin của khách mua hàng ?');
      if (editConfirm) {
        if (this.date !== undefined) {
          this.addUser.patchValue({
            birthday: this.date,
          });
        }
        if (this.editUrl !== undefined) {
          this.addUser.patchValue({
            imageUrl: this.editUrl,
          });
        }
        this.customerService.editCustomer(this.addUser.value).subscribe(
          next => {
            window.location.reload()
          },
          error => console.log(error)
        );
      }
    }
  }

  editSubmit(userName, id) {
    if (this.uploadStatus) {
      if (this.date !== undefined) {
        this.addUser.patchValue({
          birthday: this.date,
        });
      }
      if (this.editUrl !== undefined) {
        this.addUser.patchValue({
          imageUrl: this.editUrl,
        });
      }
      this.customerService.editCustomer(this.addUser.value).subscribe(
        next => {
          $('#editModal').modal('hide');
          this.edited[this.edited.indexOf(id)]=-1;
          // alert(this.edited.indexOf(id));
          this.ngOnInit();
          this.toastr.success('Thay đổi thành công thông tin của khách hàng ' + userName + ' !');

        },
        error => console.log(error)
      );
    }
  }

  deleteSubmit(id, userName): void {
    this.orderService.findAllOrderByUserId(id).subscribe((next: any) => {
        this.orders = next.content;
        if (this.checkDeleteOrder()) {
          this.toastr.error('Khách hàng ' + userName + ' đang đặt hàng, không thể xóa!');
        } else {
          this.deleteSubmitConfirm(id, userName);
        }
        ;
      },
      error => {
        console.log(error);
        this.orders = null;
        this.deleteSubmitConfirm(id, userName);
      });
  }

  deleteSubmitConfirm(id, userName): void {
    this.customerService.deleteCustomerById(id).subscribe(
      next => {
        this.ngOnInit();
        this.toastr.success('Xóa thành công khách hàng ' + userName + ' !');
      },
      error => console.log(error)
    );
  }

  change(): void {
    this.addUser.patchValue({
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
      for (let i = 0; i < this.customers.length; i++) {
        this.deleteList.push(this.customers[i].id);
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
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.deleteList.length; i++) {
        this.customerService.deleteCustomerById(this.deleteList[i]).subscribe(
          next => {
            this.ngOnInit();
            this.customers = []
          },
          error => console.log(error)
        );
      }
      this.toastr.success('Xóa thành công ' + this.deleteList.length + 'khách hàng !');
    }
  }

  // tslint:disable-next-line:typedef
  hoverUploadPic() {
    $('.icon-upload-alt').css('opacity', '0.8');
  }


  // tslint:disable-next-line:typedef
  leaveUploadPic() {
    $('.icon-upload-alt').css('opacity', '-1');
  }

  selectAvatar() {
    $('#myAvatar').click();
  }

  // tslint:disable-next-line:typedef
  readURL(target: any) {
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
    } else {
    }
  }

  private uploadFireBaseAndSubmit(): void {
    const target: any = document.getElementById('myAvatar');
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(target.files[0]);
    this.percentUpload = this.task.snapshotChanges()
      .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.editUrl = url;
          this.uploadStatus = true;
        });
      }))
      .subscribe();
  }

  checkDeleteOrder(): boolean {
    var statusDelete = false;
    this.orders.forEach(order => {
      if (order.orderStatus !== this.deleteCheckOrderValue[0] && order.orderStatus !== this.deleteCheckOrderValue[1]) {
        statusDelete = true;
      }
    })
    return statusDelete;
  }

  dateValidate(event) {
    this.dateRequired = false;
    this.dateRegex = false;
    this.dateOutRange = false;
    const eventString = event.toString();
    const nullValue = "";
    if (eventString == nullValue) {
      this.dateRequired = true;
    } else {
      let check = eventString.split('/');
      const checkDay = check[0].match('(0[1-9]|[1-2][0-9]|3[0-1])');
      const checkMonth = check[1]?.match('(0[0-9]|1[0-2])');
      const checkYear = check[2]?.match('[0-9]{4}');
      var dateObject = new Date(+check[2], check[1] - 1, +check[0]);
      const regExp = '^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[13-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$';
      if (eventString.match(regExp) && checkDay && checkMonth && checkYear) {
        if (dateObject.getFullYear() <= this.maxDate.getFullYear() && dateObject.getFullYear() >= this.maxDate.getFullYear()) {
          this.dateOutRange = true;
        }
      } else {
        if (check[2] < 1600 && check[2] !== nullValue) {
          this.dateOutRange = true;
        } else {
          this.dateRegex = true;
        }
      }
    }
  }
}
