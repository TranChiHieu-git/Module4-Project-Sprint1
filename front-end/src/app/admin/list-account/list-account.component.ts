import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {Account} from '../../models/account';
import {Employees} from '../../models/employees';
import {Role} from '../../models/role';
import {Md5} from 'ts-md5';
import {CustomerService} from '../../services/customer.service';
import {Customer} from '../../models/customer';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from '../../models/employee';
import {NotificationService} from "../../services/notification.service";

function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.accountPassword === v.confirmPassword) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent implements OnInit {
  accountList: Account[] = [];
  accountlist: Account[] = [];
  roleList: Role[];
  accountForm: FormGroup;
  editAccountForm: FormGroup;
  p = 1;
  infoAccountById: Employees = new Employees();
  infoAccountById2: Customer = new Customer();
  AccountById: Account = new Account();
  editResuilt: Account;
  size = 6;
  pageClicked = 0;
  pages = [];
  totalPages = 1;
  promiseAccount: any;
  userName = '';
  employeeList: Employee[];
  confirmPassword: string;

  constructor(private adminService: AdminService,
              private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private employeeService: EmployeeService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.employeeService.findAll().subscribe(next => {
      this.employeeList = next;
    });
    this.adminService.findAllRole().subscribe(next => {
      this.roleList = next;
    }, error => {
      console.log(error);
    });
    this.adminService.findAll().subscribe(next => {
      this.accountlist = next;
    }, error => {
      console.log(error);
    });
    this.getAll();
    this.accountForm = this.formBuilder.group({
      accountId: [''],
      accountName: ['', [Validators.required]],
      accountPassword: [''],
      pwGroup: this.formBuilder.group({
        accountPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      }, {validator: comparePassword}),
      deleteFlag: [''],
      role: ['', [Validators.required]],

    });
    this.editAccountForm = this.formBuilder.group({
      accountId: [''],
      accountName: ['', [Validators.pattern('^[a-zA-Z0-9\\,\\.\\-\\_\\@]{1,}$'), this.existAccountName.bind(this)]],
      accountPassword: ['', [Validators.pattern('^[a-zA-Z0-9]{1,}$')]],
      deleteFlag: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  // tslint:disable-next-line:typedef
  existAccountName(c: AbstractControl) {
    const v = c.value;
    for (const acc of this.accountlist) {
      if (acc.accountName === v && v !== this.AccountById.accountName) {
        return {nameAccountExist: true};
      }
    }
    return null;
  }

  getAll(): void {
    this.getAllSubmit(0);
  }

  // tslint:disable-next-line:typedef
  getAllSubmit(page) {
    this.adminService.getAllCourse(page, this.size, this.userName).subscribe(
      data => {
        this.pageClicked = page;
        this.accountList = data.content;

        // tslint:disable-next-line:prefer-for-of
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }, error => console.log(error)
    );
  }

  // tslint:disable-next-line:typedef
  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.getAllSubmit(this.pageClicked);
    }
  }

  // tslint:disable-next-line:typedef
  onNext() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.getAllSubmit(this.pageClicked);
    }
  }

  // tslint:disable-next-line:typedef
  onFirst() {
    this.pageClicked = 0;
    this.getAllSubmit(this.pageClicked);
  }

  // tslint:disable-next-line:typedef
  onLast() {
    this.pageClicked = this.totalPages - 1;
    this.getAllSubmit(this.pageClicked);
  }

  // tslint:disable-next-line:typedef
  info(id) {
    this.infoAccountById.position = null;
    this.adminService.findByInfoId(id).subscribe(next => {
      this.infoAccountById = next;
    }, error => {
      console.log(error);
    });
    if (this.infoAccountById.position === null) {
      this.customerService.getCustomerById(id).subscribe(next => {
        this.infoAccountById2 = next;
      }, error => {
        console.log(error);
      });
    }
    $('#infor').show();
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.close').click(function () {
      $('#infor').hide();
    });
  }

  // tslint:disable-next-line:typedef
  edit(id) {
    this.infoAccountById = new Employees();
    this.adminService.findByInfoId(id).subscribe(next => {
      this.infoAccountById = next;
    });
    this.customerService.getCustomerById(id).subscribe(next => {
      this.infoAccountById2 = next;
      // tslint:disable-next-line:no-shadowed-variable
    }, error => {
      console.log(error);
    });
    this.adminService.findAllRole().subscribe(next => {
      this.roleList = next;
    }, error => {
      console.log(error);
    });
    this.adminService.findAccountById(id).subscribe(next => {
      this.AccountById = next;
    }, error => {
      console.log(error);
    });
    this.adminService.findAccountById(id).subscribe(next => {
      this.editAccountForm.patchValue({
        accountId: next.accountId,
        accountName: '',
        accountPassword: '',
        deleteFlag: next.deleteFlag,
        role: next.role.roleId
      });
    }, error => {
      console.log(error);
    });
    $('#edit').show();
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.close').click(function () {
      $('#edit').hide();
    });
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.destroy').click(function () {
      $('#edit').hide();
    });
  }

// tslint:disable-next-line:typedef
  delete(id) {
    this.adminService.findAccountById(id).subscribe(next => {
      this.AccountById = next;
    }, error => {
      console.log(error);
    });
    $('#delete').show();
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.close').click(function () {
      $('#delete').hide();
    });
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.destroy').click(function () {
      $('#delete').hide();
    });
    // tslint:disable-next-line:only-arrow-functions typedef
  }

  // tslint:disable-next-line:typedef
  create() {
    const md5 = new Md5();
    this.accountForm.patchValue({
      accountPassword: md5.appendAsciiStr(this.accountForm.get('pwGroup.accountPassword').value as string).end()
    });
    this.adminService.findRoleById(this.accountForm.get('role').value).subscribe(
      next => {
        this.promiseAccount = new Promise(resolve => resolve(next));
        this.promiseAccount.then((value) => {
            this.accountForm.value.role = value;
            if (this.accountForm.valid) {
              this.adminService.create(this.accountForm.value).subscribe(
                () => {
                  this.getAll();
                  this.accountForm.reset();
                  $('#close').click();
                  this.showCreated();
                },
                error => console.log(error)
              );
            }
          }
        );
      }
    );
  }

  showCreated() {
    this.notificationService.showSuccess('Bạn đã thêm mới thành công', 'Thông báo')
  }

  // tslint:disable-next-line:typedef
  deleted(accountId) {
    this.adminService.deleteById(accountId).subscribe(next => {
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.editResuilt = new Account();
    this.editResuilt.accountId = this.editAccountForm.value.accountId;
    // tslint:disable-next-line:max-line-length
    this.editResuilt.accountName = this.editAccountForm.value.accountName !== '' ? this.editAccountForm.value.accountName : this.AccountById.accountName;
    // tslint:disable-next-line:max-line-length
    this.editResuilt.accountPassword = this.editAccountForm.value.accountPassword !== '' ? this.editAccountForm.value.accountPassword : this.AccountById.accountPassword;
    this.editResuilt.deleteFlag = this.editAccountForm.value.deleteFlag;
    this.adminService.findRoleById(this.editAccountForm.value.role).subscribe(next => {
      this.editResuilt.role = next;
      this.adminService.edit(this.editResuilt).subscribe(next2 => {
        window.location.reload();
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }
}

