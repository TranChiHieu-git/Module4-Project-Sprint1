import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Account} from '../../models/account';
import {Employees} from '../../models/employees';
import {Role} from '../../models/role';
import {CustomerService} from '../../services/customer.service';
import {Customer} from '../../models/customer';
import {ToastrService} from 'ngx-toastr';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from '../../models/employee';

// tslint:disable-next-line:typedef
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

  constructor(private adminService: AdminService,
              private route: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private customerService: CustomerService,
              private toastrService: ToastrService,
              private employeeService: EmployeeService) {
  }

  accountList: Account[] = [];
  accountlist: Account[] = [];
  roleList: Role[];
  accountForm: FormGroup;
  accountForm2 = new Array<FormGroup>();
  editAccountForm: FormGroup;
  deleteAccountForm: FormGroup;
  infoAccountById: Employees = new Employees();
  infoAccountById2: Customer = new Customer();
  AccountById: Account = new Account();
  editResuilt: Account;
  size = 6;
  pageClicked = 0;
  pages = [];
  nameRole = '';
  userName = '';
  totalPages = 1;
  promiseAccount: any;
  private sumVal = 0;
  employeeList: Employee[];
  // tslint:disable-next-line:ban-types
  counts = new Array<Number>();

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
      role: ['', [Validators.required]]
    });
    this.editAccountForm = this.formBuilder.group({
      accountId: ['', [Validators.required]],
      accountName: ['', [Validators.pattern('^[a-zA-Z0-9\\,\\.\\-\\_\\@]{1,}$'), this.existAccountName.bind(this)]],
      accountPassword: ['', [Validators.pattern('^[a-zA-Z0-9]{1,}$')]],
      deleteFlag: ['', [Validators.required]],
      role: ['', [Validators.required]],
      reason: ['']
    });
    this.deleteAccountForm = this.formBuilder.group({
      accountId: ['', [Validators.required]],
      accountName: ['', [Validators.required]],
      accountPassword: ['', [Validators.required]],
      deleteFlag: ['', [Validators.required]],
      role: ['', [Validators.required]],
      reason: ['', [Validators.required]]
    });
  }

  // tslint:disable-next-line:typedef
  addMore() {
    this.accountForm2.push(this.formBuilder.group({
      accountId: [''],
      accountName: ['', [Validators.required]],
      accountPassword: [''],
      pwGroup: this.formBuilder.group({
        accountPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      }, {validator: comparePassword}),
      deleteFlag: [''],
      role: ['', [Validators.required]],
    }));
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

  // tslint:disable-next-line:typedef
  getListAccount() {
    this.adminService.findAll().subscribe(next => {
      this.accountlist = next;
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line:typedef
  existAccountName2() {
    this.getListAccount();
    const accountName = this.accountForm.get('accountName').value;
    for (const acc of this.accountlist) {
      if (acc.accountName === accountName && accountName !== this.AccountById.accountName) {
        return false;
      }
    }
    return true;
  }

  // tslint:disable-next-line:typedef
  existAccountName3(index) {
    this.getListAccount();
    const accountName = this.accountForm2[index].get('accountName').value;
    for (const acc of this.accountlist) {
      if (acc.accountName === accountName && accountName !== this.AccountById.accountName) {
        return false;
      }
    }
    return true;
  }

  getAll(): void {
    this.getAllSubmit(0);
  }

  // tslint:disable-next-line:typedef
  getAllSubmit(page) {
    this.adminService.getAllCourse(page, this.size, this.userName, this.nameRole).subscribe(
      data => {
        this.pageClicked = page;
        this.accountList = data.content;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }, error => console.log(error)
    );
  }

  // tslint:disable-next-line:typedef
  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      switch (this.sumVal) {
        case 0:
          this.nameRole = '';
          this.getAllSubmit(this.pageClicked);
          break;
        case 1:
          this.nameRole = 'ROLE_ADMIN';
          this.getAllSubmit(this.pageClicked);
          break;
        case 2:
          this.nameRole = 'ROLE_PARTNER';
          this.getAllSubmit(this.pageClicked);
          break;
        case 3:
          this.nameRole = 'ROLE_WAREHOUSE';
          this.getAllSubmit(this.pageClicked);
          break;
        case 4:
          this.nameRole = 'ROLE_MEMBER';
          this.getAllSubmit(this.pageClicked);
          break;
      }
    }
  }

  // tslint:disable-next-line:typedef
  onNext() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      switch (this.sumVal) {
        case 0:
          this.nameRole = '';
          this.getAllSubmit(this.pageClicked);
          break;
        case 1:
          this.nameRole = 'ROLE_ADMIN';
          this.getAllSubmit(this.pageClicked);
          break;
        case 2:
          this.nameRole = 'ROLE_PARTNER';
          this.getAllSubmit(this.pageClicked);
          break;
        case 3:
          this.nameRole = 'ROLE_WAREHOUSE';
          this.getAllSubmit(this.pageClicked);
          break;
        case 4:
          this.nameRole = 'ROLE_MEMBER';
          this.getAllSubmit(this.pageClicked);
          break;
      }
    }
  }

  // tslint:disable-next-line:typedef
  onFirst() {
    this.pageClicked = 0;
    switch (this.sumVal) {
      case 0:
        this.nameRole = '';
        this.getAllSubmit(this.pageClicked);
        break;
      case 1:
        this.nameRole = 'ROLE_ADMIN';
        this.getAllSubmit(this.pageClicked);
        break;
      case 2:
        this.nameRole = 'ROLE_PARTNER';
        this.getAllSubmit(this.pageClicked);
        break;
      case 3:
        this.nameRole = 'ROLE_WAREHOUSE';
        this.getAllSubmit(this.pageClicked);
        break;
      case 4:
        this.nameRole = 'ROLE_MEMBER';
        this.getAllSubmit(this.pageClicked);
        break;
    }
  }

  // tslint:disable-next-line:typedef
  onLast() {
    this.pageClicked = this.totalPages - 1;
    switch (this.sumVal) {
      case 0:
        this.nameRole = '';
        this.getAllSubmit(this.pageClicked);
        break;
      case 1:
        this.nameRole = 'ROLE_ADMIN';
        this.getAllSubmit(this.pageClicked);
        break;
      case 2:
        this.nameRole = 'ROLE_PARTNER';
        this.getAllSubmit(this.pageClicked);
        break;
      case 3:
        this.nameRole = 'ROLE_WAREHOUSE';
        this.getAllSubmit(this.pageClicked);
        break;
      case 4:
        this.nameRole = 'ROLE_MEMBER';
        this.getAllSubmit(this.pageClicked);
        break;
    }
  }

  // tslint:disable-next-line:typedef
  info(id) {
    this.infoAccountById.position = null;
    this.adminService.findByInfoId(id).subscribe(next => {
      this.infoAccountById = next;
    });
    if (this.infoAccountById.position === null) {
      this.adminService.findByInfoUserId(id).subscribe(next => {
        if (next.imageUrl === '' || next.imageUrl === null || next.imageUrl === undefined) {
          next.imageUrl = '../../../assets/photo/avatadefault.png';
        }
        this.infoAccountById2 = next;
      });
    } else {
    }
    $('#infor').show();
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.close').click(function() {
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
      this.toastrService.error('', 'tài khoản đã bị xóa');
      this.ngOnInit();
      $('.destroy').click();
    });
    this.adminService.findAccountById(id).subscribe(next => {
      this.editAccountForm.patchValue({
        accountId: next.accountId,
        accountName: next.accountName,
        accountPassword: '',
        deleteFlag: next.deleteFlag,
        role: next.role.roleId,
        reason: '',
      });
    }, error => {
      console.log(error);
    });
    $('#edit').show();
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.close').click(function() {
      $('#edit').hide();
    });
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.destroy').click(function() {
      $('#edit').hide();
    });
  }

// tslint:disable-next-line:typedef
  delete(id) {
    this.adminService.findAccountById(id).subscribe(next => {
      this.deleteAccountForm.patchValue({
        accountId: next.accountId,
        accountName: next.accountName,
        accountPassword: next.accountPassword,
        deleteFlag: next.deleteFlag,
        role: next.role.roleId,
        reason: '',
      });
      this.AccountById = next;
    }, error => {
      console.log(error);
    });
    $('#delete').show();
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.close').click(function() {
      $('#delete').hide();
    });
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.destroy').click(function() {
      $('#delete').hide();
    });
    // tslint:disable-next-line:only-arrow-functions typedef
  }

  // tslint:disable-next-line:typedef
  create() {
    if (this.existAccountName2()) {
      this.accountForm.patchValue({
        accountPassword: this.accountForm.get('pwGroup.accountPassword').value
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
    } else {
      this.toastrService.error('Tên tài khoản đã tồn tại', '', {
        positionClass: 'toast-top-center'
      });
    }
  }

  // tslint:disable-next-line:typedef
  create2() {
    for (let i = 0; i < this.accountForm2.length; i++) {
      if (this.existAccountName3(i)) {
        this.accountForm2[i].patchValue({
          accountPassword: this.accountForm2[i].get('pwGroup.accountPassword').value
        });
        this.adminService.findRoleById(this.accountForm2[i].get('role').value).subscribe(
          next => {
            this.promiseAccount = new Promise(resolve => resolve(next));
            this.promiseAccount.then((value) => {
                this.accountForm2[i].value.role = value;
                if (this.accountForm2[i].valid) {
                  this.adminService.create(this.accountForm2[i].value).subscribe(
                    () => {
                      this.getAll();
                      this.accountForm2[i].reset();
                      this.showCreated();
                      this.accountForm2.splice(i, 1);
                    },
                    error => console.log(error)
                  );
                }
              }
            );
          }
        );
      } else {
        this.toastrService.error('Tên tài khoản đã tồn tại', '', {
          positionClass: 'toast-top-center'
        });
      }
    }
  }

  // tslint:disable-next-line:typedef
  showCreated() {
    this.toastrService.success('Bạn đã thêm mới thành công', 'Thông báo');
  }

  // tslint:disable-next-line:typedef
  deleted(accountId) {
    this.adminService.findAccountById(accountId).subscribe(next => {
      next.reason = this.deleteAccountForm.value.reason;
      this.adminService.delete(next).subscribe(next2 => {
        this.toastrService.success('Xóa tài khoản thành công');
        this.ngOnInit();
        $('.destroyDelete').click();
      }, error => {
        this.toastrService.error('', 'Xóa tài khoản thất bại');
      });
    });
  }

  // tslint:disable-next-line:typedef
  edited() {
    this.editResuilt = new Account();
    this.editResuilt.accountId = this.editAccountForm.value.accountId;
    // tslint:disable-next-line:max-line-length
    this.editResuilt.accountName = this.editAccountForm.value.accountName !== '' ? this.editAccountForm.value.accountName : this.AccountById.accountName;
    // tslint:disable-next-line:max-line-length
    this.editResuilt.accountPassword = this.editAccountForm.value.accountPassword !== '' ? this.editAccountForm.value.accountPassword : this.AccountById.accountPassword;
    this.editResuilt.deleteFlag = this.editAccountForm.value.deleteFlag;
    this.adminService.findAccountById(this.editResuilt.accountId).subscribe(next => {
      if (next !== null) {
        this.adminService.findRoleById(this.editAccountForm.value.role).subscribe(next2 => {
          this.editResuilt.role = next2;
          this.adminService.edit(this.editResuilt).subscribe(next3 => {
            this.toastrService.success('Chỉnh sửa thông tin thành công');
            this.ngOnInit();
            $('.destroy').click();
          }, error => {
            this.toastrService.error('', 'Chỉnh sửa thông tin thất bại');
          });
        });
      }
    }, error => {
      this.toastrService.error('', 'tài khoản đã bị xóa. Không thể chỉnh sửa');
      this.ngOnInit();
      $('.destroy').click();
    });
  }

  // tslint:disable-next-line:typedef
  filterTypeRole(val: number) {
    this.sumVal = val;
    switch (val) {
      case 0:
        this.nameRole = '';
        this.getAllSubmit(0);
        break;
      case 1:
        this.nameRole = 'ROLE_ADMIN';
        this.getAllSubmit(0);
        break;
      case 2:
        this.nameRole = 'ROLE_PARTNER';
        this.getAllSubmit(0);
        break;
      case 3:
        this.nameRole = 'ROLE_WAREHOUSE';
        this.getAllSubmit(0);
        break;
      case 4:
        this.nameRole = 'ROLE_MEMBER';
        this.getAllSubmit(0);
        break;
    }
  }

  // tslint:disable-next-line:typedef
  checkInvalidForm2() {
    let check = false;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.accountForm2.length; i++) {
      if (this.accountForm2[i].invalid) {
        check = true;
      }
    }
    return check;
  }
}
