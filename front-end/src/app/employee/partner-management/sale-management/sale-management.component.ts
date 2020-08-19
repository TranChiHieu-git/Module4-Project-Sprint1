import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from '../../../services/employee.service';
import {CustomerService} from '../../../services/customer.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CouponService} from '../../../services/coupon.service';
import {AdminService} from '../../../services/admin.service';
import {ProductService} from '../../../services/product.service';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {UUID} from 'angular2-uuid';
import {NotificationService} from '../../../services/notification.service';
import {Coupon} from '../../../models/coupon';
import {ToastrService} from 'ngx-toastr';
// import * as $ from 'jquery';

declare const $: any;

@Component({
  selector: 'app-sale-management',
  templateUrl: './sale-management.component.html',
  styleUrls: ['./sale-management.component.scss']
})
export class SaleManagementComponent implements OnInit {
  @ViewChild('closeDeleteModal') closeDeleteModal;
  @ViewChild('closeDeleteManyModal') closeDeleteManyModal;
  userName: any;
  employeeList = [];
  customerList = [];
  couponList = [];
  size = 4;
  pages = [];
  createDateFrom = '';
  createDateTo = '';
  employee = '';
  customer = '';
  searchCouponForm: FormGroup;
  pageClicked = 0;
  totalPages = 1;
  createCouponForm: FormGroup;
  createProductLists = [];
  createCustomerLists = [];
  randomNumber: number;
  @ViewChild('closeCreateModal') closeCreateModal;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  minDate: Date;

  // control = this.createCouponForm.controls.couponDetails as FormArray;
  coupon: Coupon;
  couponId: number;
  deleteList = new Array();
  utf8 = 'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹế';
  constructor(private employeeService: EmployeeService,
              private customerService: CustomerService,
              private adminService: AdminService,
              private couponService: CouponService,
              private productService: ProductService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private toastr: ToastrService) {
    this.dpConfig.containerClass = 'theme-orange';
    this.dpConfig.dateInputFormat = 'DD/MM/YYYY';
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
  }

  ngOnInit(): void {
    this.searchCouponForm = this.formBuilder.group({
      employee: [''],
      user: [''],
      createDateFrom: [''],
      createDateTo: [''],
    });

    this.employeeService.findAll().subscribe(next => {
      this.employeeList = next;
    }, error => {
      console.log(error);
    });

    this.customerService.getAllCustomer().subscribe(next => {
      this.customerList = next;
    }, error => {
      console.log(error);
    });
    this.getAllCoupon(0);

    this.initCreateForm();
    this.initCouponDetailsForm();
    this.getAllProducts();
    this.getAllCustomers();
  }


  getAllCoupon(page): void {
    this.couponService.getAllCourse(page, this.size, this.createDateFrom, this.createDateTo, this.employee,
      this.customer).subscribe(next => {
      if (next !== null) {
        this.pageClicked = page;
        this.totalPages = next.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        this.couponList = next.content;
        if (this.couponList.length < 4) {
          $('.table').attr('style', 'margin-bottom: ' + ((4 - this.couponList.length) * 56) + 'px');
        } else {
          $('.table').attr('style', 'margin-bottom: 0');
        }
      } else {
        this.pageClicked = 0;
        this.totalPages = 1;
        this.pages = [];
        this.couponList = null;
      }
    }, error => {
      console.log(error);
    });
  }

  search(): void {
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.employee').click(function() {
      $('.employee').attr('style', 'box-shadow: none');
    });
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.user').click(function() {
      $('.user').attr('style', 'box-shadow: none');
    });
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.fromdate').click(function() {
      $('.fromdate').attr('style', 'box-shadow: none');
    });
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.fromto').click(function() {
      $('.fromto').attr('style', 'box-shadow: none');
    });
    const regName = new RegExp('^[a-zA-Z0-9\\ ' + this.utf8 + ']{1,100}$');
    const regDate = new RegExp('^[0-9]{4}\\-+[0-9]{1,2}\\-+[0-9]{1,2}$');
    let employeeName = false;
    if (this.searchCouponForm.value.employee === 'Tất cả') {
      this.employee = '';
      employeeName = true;
    } else if (this.searchCouponForm.value.employee !== '') {
      if (!this.searchCouponForm.value.employee.match(regName)) {
        $('.employee').attr('style', 'box-shadow: 1px 1px 5px 5px #f18502');
      } else {
        this.employee = this.searchCouponForm.value.employee;
        employeeName = true;
      }
    } else {
      this.employee = '';
      employeeName = true;
    }

    let customerName = false;
    if (this.searchCouponForm.value.user !== '') {
      if (!this.searchCouponForm.value.user.match(regName)) {
        $('.user').attr('style', 'box-shadow: 1px 1px 5px 5px #f18502');
      } else {
        this.customer = this.searchCouponForm.value.user;
        customerName = true;
      }
    } else if (this.searchCouponForm.value.user === 'Tất cả') {
      this.customer = '';
      customerName = true;
    } else {
      this.customer = this.searchCouponForm.value.user;
      customerName = true;
    }
    let fromDate: Date;
    if (this.searchCouponForm.value.createDateFrom !== '') {
      this.createDateFrom = this.searchCouponForm.value.createDateFrom;
      const year = parseInt(this.searchCouponForm.value.createDateFrom.split('-')[0], 0);
      const month = parseInt(this.searchCouponForm.value.createDateFrom.split('-')[1], 0) - 1;
      const day = parseInt(this.searchCouponForm.value.createDateFrom.split('-')[2], 0);
      fromDate = new Date(year, month, day);
    }
    let toDate: Date;
    if (this.searchCouponForm.value.createDateTo !== '') {
      this.createDateTo = this.searchCouponForm.value.createDateTo;
      const year = parseInt(this.searchCouponForm.value.createDateTo.split('-')[0], 0);
      const month = parseInt(this.searchCouponForm.value.createDateTo.split('-')[1], 0) - 1;
      const day = parseInt(this.searchCouponForm.value.createDateTo.split('-')[2], 0);
      toDate = new Date(year, month, day);
    }
    let checkDate;
    if (this.searchCouponForm.value.createDateTo !== '' && this.searchCouponForm.value.createDateFrom !== '') {
      checkDate = false;
      if (toDate >= fromDate) {
        checkDate = true;
      } else {
        $('.fromto').attr('style', 'box-shadow: 1px 1px 5px 5px #f18502');
      }
    }
    if (this.searchCouponForm.value.createDateTo === '') {
      this.searchCouponForm.patchValue({
        createDateTo: ''
      });
    }
    if (this.searchCouponForm.value.createDateFrom === '') {
      this.searchCouponForm.patchValue({
        createDateFrom: ''
      });
    }
    if (employeeName === true && customerName === true) {
      if (this.searchCouponForm.value.createDateTo !== '' && this.searchCouponForm.value.createDateFrom !== '') {
        if (checkDate === true) {
          this.getAllCoupon(0);
          $('.fromdate').attr('style', 'box-shadow: none');
          $('.fromto').attr('style', 'box-shadow: none');
          $('.user').attr('style', 'box-shadow: none');
          $('.employee').attr('style', 'box-shadow: none');
        } else {
          this.toastr.error('Giá trị nhập vào không đúng định dạng. Vui lòng nhập lại!');
        }
      } else {
        this.getAllCoupon(0);
        $('.fromdate').attr('style', 'box-shadow: none');
        $('.fromto').attr('style', 'box-shadow: none');
        $('.user').attr('style', 'box-shadow: none');
        $('.employee').attr('style', 'box-shadow: none');
      }
    } else {
      this.toastr.error('Giá trị nhập vào không đúng định dạng. Vui lòng nhập lại!');
    }
  }

  onPrevious(): void {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.getAllCoupon(this.pageClicked);
    }
  }

  onNext(): void {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.getAllCoupon(this.pageClicked);
    }
  }

  onLast(): void {
    this.pageClicked = this.totalPages - 1;
    this.getAllCoupon(this.pageClicked);
  }
  // huylm ------------------------------------
  initCreateForm(): FormGroup {
    return this.createCouponForm = this.formBuilder.group({
      couponId: [this.randomId()],
      employeeId: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      createDate: ['', [Validators.required]],
      deleteFlag: [0],
      couponDetails: this.formBuilder.array([])
    });
  }

  initCouponDetailsForm(): FormGroup {
    return this.formBuilder.group({
      productName: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });
  }

  addNewCouponDetails(): void {
    const control = this.createCouponForm.controls.couponDetails as FormArray;
    control.push(
      this.initCouponDetailsForm()
    );
  }

  private getAllProducts(): void {
    this.couponService.getAllProducts().subscribe(data => {
      this.createProductLists = data;
    });
  }

  private getAllCustomers(): void {
    this.customerService.getAllCustomer().subscribe(data => {
      this.createCustomerLists = data;
    }, error => {
      console.log(error);
    });
  }

  onCreateCoupon(): void {
    this.couponService.createNew(this.createCouponForm.value).subscribe(next => {
      this.closeCreateModal.nativeElement.click();
      this.notificationService.create('Thêm mới phiếu thành công');
      this.ngOnInit();
    }, error => {
    });
  }

  OnCancelCreateForm(): void {
    this.initCreateForm();
  }

  deleteCouponDetails(index): void {
    const formArrayCouponDetails = this.createCouponForm.controls.couponDetails as FormArray;
    formArrayCouponDetails.removeAt(index);
  }

  randomId(): number {
    return this.randomNumber = this.randomInt(9, 999999);
  }

  randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getEmployeeMsgError(): string {
    return this.createCouponForm.get('employeeId').hasError('required') ? 'Tên nhân viên không được để trống' : '';
  }

  getUserMsgError(): string {
    return this.createCouponForm.get('userId').hasError('required') ? 'Tên khách hàng không được để trống' : '';
  }

  getCreateDateMsgError(): string {
    return this.createCouponForm.get('createDate').hasError('required') ? 'Ngày tạo phiếu không được để trống' : '';
  }

  getProductNameMsgError(): string {
    return this.initCouponDetailsForm().get('productName').hasError('required') ? 'Tên mặt hàng không được để trống' : '';
  }

  getQuantityMsgError(): string {
    return this.initCouponDetailsForm().get('quantity').hasError('required') ? 'Số lượng không được để trống' : '';
  }
    showDeleteError(): void {
    this.toastr.error('Phiếu đang được sử dụng, không thể xóa!');
  }

  showDeleteSuccess(): void {
    this.toastr.success('Xóa thành công!');
  }

  showDeleteWarning(): void {
    this.toastr.error('Chưa có phiếu được chọn!');
  }

  showError404(): void {
    this.toastr.error('Phiếu không tồn tại!');
  }

  deleteCoupon(id: number): void {
    this.couponService.findCouponById(id).subscribe(next => {
        this.coupon = next;
        this.couponId = next.couponId;
      },
      error => {
        console.log(error);
        this.showError404();
        setTimeout(function(){
          $('#modalDeleteCoupon').modal('hide');
        }, 20);
      });
  }

  onDelete(): void {
    this.couponService.deleteCoupon(this.coupon).subscribe(
      next => {
        this.closeDeleteModal.nativeElement.click();
        this.showDeleteSuccess();
        this.getAllCoupon(this.pageClicked);
      },
      error => {
        console.log(error);
        this.closeDeleteModal.nativeElement.click();
        this.showDeleteError();

      }
    );
  }

  selectCheckBox(event, id): void {
    const indexOfId = this.deleteList.indexOf(id);
    if (event.target.checked) {
      if (indexOfId < 0) {
        this.deleteList.push(id);
        console.log(this.deleteList.indexOf(id));
      }
    } else {
      this.deleteList.splice(indexOfId, 1);
    }
  }

  selectAllCheckBox(event): void {
    if (event.target.checked) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.couponList.length; i++) {
        this.deleteList.push(this.couponList[i].couponId);
        console.log(this.couponList[i]);
      }
    } else {
      this.deleteList.splice(0, this.deleteList.length);
    }
  }

  checkAll(): void{
    $('#checkAll').change(function () {
      $('input:checkbox').prop('checked', this.checked);
    });
  }

  deleteManyCoupon(): void {
    if (this.deleteList.length <= 0) {
      this.showDeleteWarning();
    } else {
      $('#deleteMany').click();
    }
  }

  onDeleteMany(): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.deleteList.length; i++) {
      this.couponService.deleteManyCoupon(this.deleteList[i]).subscribe(
        next => {
          this.closeDeleteManyModal.nativeElement.click();
          this.showDeleteSuccess();
          this.emptyDeleteList();
          $('#checkAll').prop('checked', false);
          this.getAllCoupon(this.pageClicked);
        },
        error => {
          console.log(error);
          this.closeDeleteManyModal.nativeElement.click();
          this.showDeleteError();
        }
      );
    }
  }

  emptyDeleteList(): void {
    this.deleteList.length = 0;
  }

  backList(): void {
    this.createDateFrom = '';
    this.createDateTo = '';
    this.employee = '';
    this.customer = '';
    this.ngOnInit();
  }
}
