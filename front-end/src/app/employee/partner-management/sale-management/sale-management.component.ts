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

@Component({
  selector: 'app-sale-management',
  templateUrl: './sale-management.component.html',
  styleUrls: ['./sale-management.component.scss']
})
export class SaleManagementComponent implements OnInit {
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

  constructor(private employeeService: EmployeeService,
              private customerService: CustomerService,
              private adminService: AdminService,
              private couponService: CouponService,
              private productService: ProductService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService) {
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
    if (this.searchCouponForm.value.createDateFrom !== '') {
      this.createDateFrom =
        this.searchCouponForm.value.createDateFrom.toLocaleDateString().split('/')[2]
        + '-' + this.searchCouponForm.value.createDateFrom.toLocaleDateString().split('/')[1]
        + '-' + this.searchCouponForm.value.createDateFrom.toLocaleDateString().split('/')[0];
    }
    if (this.searchCouponForm.value.createDateTo !== '') {
      this.createDateTo =
        this.searchCouponForm.value.createDateTo.toLocaleDateString().split('/')[2]
        + '-' + this.searchCouponForm.value.createDateTo.toLocaleDateString().split('/')[1]
        + '-' + this.searchCouponForm.value.createDateTo.toLocaleDateString().split('/')[0];
    }
    if (this.searchCouponForm.value.employee === 'Tất cả') {
      this.employee = '';
    } else {
      this.employee = this.searchCouponForm.value.employee;
    }
    if (this.searchCouponForm.value.user === 'Tất cả') {
      this.customer = '';
    } else {
      this.customer = this.searchCouponForm.value.user;
    }
    this.getAllCoupon(0);
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
}
