import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Account} from '../../models/account';
import {Employees} from '../../models/employees';
import {Role} from '../../models/role';
import {Md5} from 'ts-md5';
import {CustomerService} from '../../services/customer.service';
import {Customer} from '../../models/customer';
import {ToastrService} from 'ngx-toastr';

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
              private toastrService: ToastrService) {
  }

  accountList: Account[] = [];
  accountlist: Account[] = [];
  roleList: Role[];
  accountForm: FormGroup;
  editAccountForm: FormGroup;
  deleteAccountForm: FormGroup;
  infoAccountById: Employees = new Employees();
  infoAccountById2: Customer = new Customer();
  AccountById: Account = new Account();
  editResuilt: Account;
  size = 6;
  pageClicked = 0;
  pages = [];
  search = '';
  totalPages = 1;
  promiseAccount: any;
  private sumVal = 0;
  nameRole = '';
  userName = '';
  confirmPassword: string;

  ngOnInit(): void {
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
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.search = param.get('accountName');
      if (this.search === null) {
        this.search = '';
      }
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
      accountId: ['', [Validators.required]],
      accountName: ['', [Validators.pattern('^[a-zA-Z0-9\\,\\.\\-\\_\\@]{1,}$'), this.existAccountName.bind(this)]],
      accountPassword: ['', [Validators.pattern('^[a-zA-Z0-9]{1,}$')]],
      deleteFlag: ['', [Validators.required]],
      role: ['', [Validators.required]],
      reason: [''],
    });
    this.deleteAccountForm = this.formBuilder.group({
      accountId: ['', [Validators.required]],
      accountName: ['', [Validators.required]],
      accountPassword: ['', [Validators.required]],
      deleteFlag: ['', [Validators.required]],
      role: ['', [Validators.required]],
      reason: ['', [Validators.required]],
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

  getListAccount() {
    this.adminService.findAll().subscribe(next => {
      this.accountlist = next;
    }, error => {
      console.log(error);
    });
  }

  existAccountName2() {
    this.getListAccount();
    let accountName = this.accountForm.get('accountName').value;
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
        if (data == null) {
          this.toastrService.error('Không tìm thấy dữ liệu');
        } else {
          this.pageClicked = page;
          this.accountList = data.content;
          // tslint:disable-next-line:prefer-for-of
          this.totalPages = data.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }
      }, error => console.log(error)
    );
  }

  // tslint:disable-next-line:typedef
  getAllSubmitAdmin(page) {
    this.adminService.getAllCourseAdmin(page, this.size).subscribe(
      data => {
        this.pageClicked = page;
        this.accountList = data.content;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }, error => console.log(error)
    );
  }

  // tslint:disable-next-line:typedef
  getAllSubmitWarehouse(page) {
    this.adminService.getAllCourseWarhouse(page, this.size).subscribe(
      data => {
        this.pageClicked = page;
        this.accountList = data.content;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }, error => console.log(error)
    );
  }

  // tslint:disable-next-line:typedef
  getAllSubmitPartner(page) {
    this.adminService.getAllCoursePartner(page, this.size).subscribe(
      data => {
        this.pageClicked = page;
        this.accountList = data.content;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }, error => console.log(error)
    );
  }

  // tslint:disable-next-line:typedef
  getAllSubmitUser(page) {
    this.adminService.getAllCourseUser(page, this.size).subscribe(
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
          this.getAllSubmit(this.pageClicked);
          break;
        case 1:
          this.getAllSubmitAdmin(this.pageClicked);
          break;
        case 2:
          this.getAllSubmitPartner(this.pageClicked);
          break;
        case 3:
          this.getAllSubmitWarehouse(this.pageClicked);
          break;
        case 4:
          this.getAllSubmitUser(this.pageClicked);
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
          this.getAllSubmit(this.pageClicked);
          break;
        case 1:
          this.getAllSubmitAdmin(this.pageClicked);
          break;
        case 2:
          this.getAllSubmitPartner(this.pageClicked);
          break;
        case 3:
          this.getAllSubmitWarehouse(this.pageClicked);
          break;
        case 4:
          this.getAllSubmitUser(this.pageClicked);
          break;
      }
    }
  }

  // tslint:disable-next-line:typedef
  onFirst() {
    this.pageClicked = 0;
    switch (this.sumVal) {
      case 0:
        this.getAllSubmit(this.pageClicked);
        break;
      case 1:
        this.getAllSubmitAdmin(this.pageClicked);
        break;
      case 2:
        this.getAllSubmitPartner(this.pageClicked);
        break;
      case 3:
        this.getAllSubmitWarehouse(this.pageClicked);
        break;
      case 4:
        this.getAllSubmitUser(this.pageClicked);
        break;
    }
  }

  // tslint:disable-next-line:typedef
  onLast() {
    this.pageClicked = this.totalPages - 1;
    switch (this.sumVal) {
      case 0:
        this.getAllSubmit(this.pageClicked);
        break;
      case 1:
        this.getAllSubmitAdmin(this.pageClicked);
        break;
      case 2:
        this.getAllSubmitPartner(this.pageClicked);
        break;
      case 3:
        this.getAllSubmitWarehouse(this.pageClicked);
        break;
      case 4:
        this.getAllSubmitUser(this.pageClicked);
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
        if (next.imageUrl === '') {
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
      console.log(error);
    });
    this.adminService.findAccountById(id).subscribe(next => {
      this.editAccountForm.patchValue({
        accountId: next.accountId,
        accountName: next.accountName,
        accountPassword: '',
        deleteFlag: next.deleteFlag,
        role: next.role.roleId,
        reason: ''
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
        reason: ''
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
        this.toastrService.success('', 'Xóa tài khoản thất bại');
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
    this.adminService.findRoleById(this.editAccountForm.value.role).subscribe(next => {
      this.editResuilt.role = next;
      this.adminService.edit(this.editResuilt).subscribe(next2 => {
        this.toastrService.success('Chỉnh sửa thông tin thành công');
        this.ngOnInit();
        $('.destroy').click();
      }, error => {
        this.toastrService.success('', 'Chỉnh sửa thông tin thất bại');
      });
    });
  }

  // tslint:disable-next-line:typedef
  filterTypeRole(val: number) {
    this.sumVal = val;
    switch (val) {
      case 0:
        this.getAllSubmit(0);
        break;
      case 1:
        this.getAllSubmitAdmin(0);
        break;
      case 2:
        this.getAllSubmitPartner(0);
        break;
      case 3:
        this.getAllSubmitWarehouse(0);
        break;
      case 4:
        this.getAllSubmitUser(0);
        break;
    }
  }
}
