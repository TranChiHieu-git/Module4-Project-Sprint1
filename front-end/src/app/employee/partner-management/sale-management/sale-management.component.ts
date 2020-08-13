import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../../services/employee.service';
import {CustomerService} from '../../../services/customer.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CouponService} from '../../../services/coupon.service';
import {AdminService} from '../../../services/admin.service';
import {Product} from '../../../models/product';
import {Coupon} from '../../../models/coupon';
import {NotificationService} from '../../../services/notification.service';
import {Employee} from '../../../models/employee';
import {Customer} from '../../../models/customer';
import {Bill} from '../../../models/bill';
import {Page} from '../../../models/pagination/page';

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
  page: Page<Coupon> = new Page();
  coupon: Coupon;
  employeeList1: Employee[];
  customerList1: Customer[];
  public couponId;
  couponEditForm: FormGroup;

  constructor(private employeeService: EmployeeService,
              private customerService: CustomerService,
              private adminService: AdminService,
              private couponService: CouponService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              ) {
  }

  ngOnInit(): void {
    this.searchCouponForm = this.formBuilder.group({
      employee: [''],
      customer: [''],
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
    this.initEditForm();
    this.getAllCoupon(0);
  }

  initEditForm(): void {
    this.couponEditForm =  this.formBuilder.group({
      couponId: [''],
      employee: this.formBuilder.group({
        id: [''],
        name: [''],
        }),
      user: this.formBuilder.group({
        id: [''],
        userName: [''],
      }),
      createDate: [''],
    });
  }

  // private getData(page): void {
  //   this.couponService.getAllCourse(page, this.size, this.createDateFrom, this.createDateTo, this.employee,
  //     this.customer)
  //     // tslint:disable-next-line:no-shadowed-variable
  //     .subscribe(page => {
  //       this.page = page;
  //     });
  // }
  getAllCoupon(page) {
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

  search() {
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

  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.getAllCoupon(this.pageClicked);
    }
  }

  onNext() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.getAllCoupon(this.pageClicked);
    }
  }

  onLast() {
    this.pageClicked = this.totalPages - 1;
    this.getAllCoupon(this.pageClicked);
  }

  edit(): void {
    this.couponService.updateCoupon(this.couponEditForm.value).subscribe(
      next => {
        this.notificationService.edit('Chỉnh sửa thành công');
        // this.getData();
        this.ngOnInit();
      },
      error => console.log(error));
  }
  catchCouponId(id: number): void {
    this.couponService.findCouponById(id).subscribe(
      res => {
        this.coupon = res;
        this.couponId = res.couponId;
        this.couponEditForm.patchValue(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  switchEdit(coupon: Coupon): void {
    coupon.isEditable = !coupon.isEditable;
    $('#submit' + coupon.couponId).click();
  }
  cancelEdit(coupon: Coupon): void {
    coupon.isEditable = !coupon.isEditable;
  }
}
