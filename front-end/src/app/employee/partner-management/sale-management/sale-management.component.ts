import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../../services/employee.service';
import {CustomerService} from '../../../services/customer.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CouponService} from '../../../services/coupon.service';

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

  constructor(private employeeService: EmployeeService,
              private customerService: CustomerService,
              private couponService: CouponService,
              private formBuilder: FormBuilder) {
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


    this.customerService.getAllCustomer(0).subscribe(next => {
      this.customerList = next.content;
    }, error => {
      console.log(error);
    });
    this.getAllCoupon(0);
  }
  this.customerService.getAllCustomers().subscribe(next => {
  this.customerList = next.content;
}, error => {
  console.log(error);
});
this.getAllCoupon(0);
}

getAllCoupon(page){
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
  this.employee = this.searchCouponForm.value.employee;
  this.customer = this.searchCouponForm.value.user;
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
}

