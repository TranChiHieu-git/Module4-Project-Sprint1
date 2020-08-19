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
import {Department} from '../../models/department';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Tempjwtemp} from '../../models/tempjwtemp';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Position} from '../../models/position';

function comparePassword(c: AbstractControl): object {
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
              private employeeService: EmployeeService,
              private afStorage: AngularFireStorage,
              private loginAccount: TokenStorageService) {
  }

  currentYear = new Date().getFullYear();
  minDate = new Date(this.currentYear - 100, 0, 1);
  maxDate = new Date(this.currentYear - 18, 0, 1);
  accountList: Account[] = [];
  accountlist: Account[] = [];
  roleList: Role[];
  accountForm: FormGroup;
  accountForm2 = new Array<FormGroup>();
  editAccountForm: FormGroup;
  deleteAccountForm: FormGroup;
  deleteListAccountForm: FormGroup;
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
  employeeForm: FormGroup;
  positionList: Position[];
  departmentList: Department[];
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  src: string;
  image: string;
  uploadStatus = true;
  uploadProgressStatus = false;
  accountNotInEmployee: Account[];
  account: Account;
  deleteChose = [];
  token: any;
  decode = new JwtHelperService();
  tempJwt = new Tempjwtemp();
  accountName = '';
  editMoreForm = new Array<FormGroup>();
  check: boolean = false;
  utf8 = 'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨ'
    + 'ỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹếý';

  ngOnInit(): void {
    this.adminService.getAllAccountNotInEmployee().subscribe(next => {
      this.accountNotInEmployee = next;
    });
    this.employeeService.findAllPosition().subscribe(next => {
        this.positionList = next;
      },
      error => console.log(error)
    );
    this.employeeService.findAllDepartment().subscribe(
      next => this.departmentList = next
    );
    this.employeeForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.pattern(/^(([A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềếểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)(\s[A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặếẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)*)(\s(([A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏếốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)(\s[A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻếẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)*))*$/)]],
      gender: ['Nam', [Validators.required]],
      birthday: ['', Validators.required],
      address: ['', [Validators.required, Validators.pattern(/^(([A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềếểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)(\s[A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặếẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)*)(\s(([A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏếốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)(\s[A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻếẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)*))*$/)]],
      position: this.formBuilder.group({
        id: [],
        name: ['']
      }),
      department: this.formBuilder.group({
        id: [],
        name: ['']
      }),
      phoneNumber: ['', [Validators.required, Validators.pattern(/^09\d{8,9}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+[a-z0-9]*@[A-Za-z0-9]+(.[A-Za-z0-9]+)$/)]],
      image: [''],
      account: ['', Validators.required]
    });
    this.tempJwt = this.decode.decodeToken(this.loginAccount.getToken());
    this.accountName = this.tempJwt.sub;
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
      for (let i = 0; i < this.accountlist.length; i++) {
        this.editMoreForm.push(this.formBuilder.group({
          accountId: this.accountlist[i].accountId,
          accountName: [this.accountlist[i].accountName, [Validators.required, Validators.pattern(/^(([A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềếểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)(\s[A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặếẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)*)(\s(([A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏếốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)(\s[A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-z_àáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻếẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)*))*$/)]],
          accountPassword: [this.accountlist[i].accountPassword],
          pwGroup: this.formBuilder.group({
            accountPassword: ['',Validators.required],
            confirmPassword: ['',Validators.required],
          }, {validator: comparePassword}),
          deleteFlag: [this.accountlist[i].deleteFlag],
          role: [this.accountlist[i].role.roleId, [Validators.required]],
          reason: [''],
          check: false
        }))
      }
    }, error => {
      console.log(error);
    });

    this.getAll();
    this.accountForm = this.formBuilder.group({
      accountId: [''],
      accountName: ['', [Validators.required, Validators.pattern('^[a-z][a-z\\,\\.\\-\\_\\@\\-]{2,}$')]],
      accountPassword: [''],
      pwGroup: this.formBuilder.group({
        accountPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      }, {validator: comparePassword}),
      deleteFlag: [''],
      role: [4, [Validators.required]],
      check: false,
      reason: '',
    });
    this.editAccountForm = this.formBuilder.group({
      accountId: ['', [Validators.required]],
      accountName: ['', [Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9\\,\\.\\-\\_\\@]{1,}$'),
        this.existAccountName.bind(this)]],
      accountPassword: ['', [Validators.maxLength(100), Validators.pattern('^[a-zA-Z0-9]{1,}$')]],
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
      reason: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s' + this.utf8 + ']{1,255}$')]]
    });
    this.deleteListAccountForm = this.formBuilder.group({
      reason: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s' + this.utf8 + ']{1,255}$')]]
    });
  }

  edit(id) {
    this.infoAccountById = new Employees();
    this.adminService.findByInfoId(id).subscribe(next => {
      this.infoAccountById = next;
    });
    this.adminService.findByInfoUserId(id).subscribe(next => {
      this.infoAccountById2 = next;
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
    $('.close').click(function() {
      $('#edit').hide();
    });
    $('.destroy').click(function() {
      $('#edit').hide();
    });
  }

  edit2(id): void {
    this.editMoreForm[id - 1].patchValue({
      check: true
    });
    this.check = true;
  }

  edit3(id) {
    this.adminService.findRoleById(this.editMoreForm[id - 1].controls.role.value).subscribe(next => {
      this.editMoreForm[id - 1].patchValue({
        role: next,
        accountPassword: this.editMoreForm[id - 1].get('pwGroup.accountPassword').value
      });
      this.adminService.edit(this.editMoreForm[id - 1].value).subscribe(next => {
        this.toastrService.success('Chỉnh sửa thành công');
        this.getAll();
        this.check = false;
        this.editMoreForm[id - 1].patchValue({
          check: false
        });
      }, error => {
        console.log(error);
        this.toastrService.error('Chỉnh sửa không thành công');
      });
    });
  }

  cancel(id) {
    this.editMoreForm[id - 1].patchValue({
      check: false
    });
  }

  editMore() {
    for (let i = 0; i < this.editMoreForm.length; i++) {
      if (this.editMoreForm[i].controls.check.value == true) {
        this.adminService.findRoleById(this.editMoreForm[i].controls.role.value).subscribe(next => {
          this.editMoreForm[i].patchValue({
            role: next,
            check: false
          });
          this.adminService.edit(this.editMoreForm[i].value).subscribe(next => {
            this.toastrService.success('Chỉnh sửa thành công');
            this.getAll();
          }, error => {
            console.log(error);
            this.toastrService.error('Chỉnh sửa không thành công');
          });
        });
      }
    }
    this.check = false;
  }

  addMore(): void {
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

  existAccountName(c: AbstractControl): object {
    const v = c.value;
    for (const acc of this.accountlist) {
      if (acc.accountName === v && v !== this.AccountById.accountName) {
        return {nameAccountExist: true};
        $('.accountInput').focus();
      }
    }
    return null;
  }

  getListAccount(): void {
    this.adminService.findAll().subscribe(next => {
      this.accountlist = next;
    }, error => {
      console.log(error);
    });
  }

  existAccountName2(): boolean {
    this.getListAccount();
    const accountName = this.accountForm.get('accountName').value;
    for (const acc of this.accountlist) {
      if (acc.accountName === accountName && accountName !== this.AccountById.accountName) {
        return false;
      }
    }
    return true;
  }

  existAccountName3(index): boolean {
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

  getAllSubmit(page): void {
    this.adminService.getAllCourse(page, this.size, this.userName, this.nameRole).subscribe(
      data => {
        this.pageClicked = page;
        this.accountList = data.content;
        this.totalPages = data.totalPages;
        if (this.accountList.length < 6) {
          $('.table').attr('style', 'margin-bottom: ' + ((6 - this.accountList.length) * 58) + 'px');
        } else {
          $('.table').attr('style', 'margin-bottom: 0');
        }
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }, error => console.log(error)
    );
  }

  onPrevious(): void {
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

  onNext(): void {
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

  onFirst(): void {
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

  onLast(): void {
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

  info(id): void {
    this.infoAccountById.position = null;
    this.adminService.findByInfoId(id).subscribe(next => {
      this.infoAccountById = next;
    });
    if (this.infoAccountById.position === null) {
      this.adminService.findByInfoUserId(id).subscribe(next => {
        if (next.imageUrl === '' || next.imageUrl === null || next.imageUrl === undefined) {
          next.imageUrl = '../../../assets/photo/customer-avatar.png';
        }
        this.infoAccountById2 = next;
      });
    }
    $('#infor').show();
    $('.close').click(function() {
      $('#infor').hide();
    });
  }

  delete(id): void {
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
    $('.close').click(function() {
      $('#delete').hide();
    });
    $('.destroy').click(function() {
      $('#delete').hide();
    });
  }

  create(): void {
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

  create2(): void {
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
                      this.ngOnInit();
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

  showCreated(): void {
    this.toastrService.success('Bạn đã thêm mới thành công', 'Thông báo');
  }

  deleted(accountId): void {
    this.adminService.findAccountById(accountId).subscribe(next => {
      if (next.accountName !== this.accountName) {
        next.reason = this.deleteAccountForm.value.reason;
        this.adminService.delete(next).subscribe(next2 => {
          this.toastrService.success('Xóa tài khoản thành công');
          this.ngOnInit();
          $('.destroyDelete').click();
        }, error => {
          this.toastrService.error('', 'Xóa tài khoản thất bại');
        });
      } else {
        this.toastrService.error('', 'Xóa tài khoản thất bại');
        $('.destroyDelete').click();
      }
    });
  }

  edited(): void {
    this.editResuilt = new Account();
    this.editResuilt.accountId = this.editAccountForm.value.accountId;
    this.editResuilt.accountName =
      this.editAccountForm.value.accountName !== '' ? this.editAccountForm.value.accountName : this.AccountById.accountName;
    this.editResuilt.accountPassword = this.editAccountForm.value.accountPassword !== '' ? this.editAccountForm.value.accountPassword : '';
    this.editResuilt.deleteFlag = this.editAccountForm.value.deleteFlag;
    this.adminService.findAccountById(this.editResuilt.accountId).subscribe(next => {
      if (next !== null) {
        if (this.AccountById.accountName === next.accountName
          && this.AccountById.accountPassword === next.accountPassword
          && this.AccountById.role.roleId === next.role.roleId
          && this.AccountById.accountId === next.accountId) {
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
        } else {
          this.toastrService.error('Chỉnh sửa thông tin thất bại. Tài khoản vừa được thay đổi bởi người khác');
          this.ngOnInit();
          $('.destroy').click();
        }
      }
    }, error => {
      this.toastrService.error('', 'tài khoản đã bị xóa. Không thể chỉnh sửa');
      this.ngOnInit();
      $('.destroy').click();
    });
  }

  filterTypeRole(val: number): void {
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

  checkInvalidForm2(): boolean {
    let check = false;
    for (let i = 0; i < this.accountForm2.length; i++) {
      if (this.accountForm2[i].invalid) {
        check = true;
      }
    }
    return check;
  }

  selectFile(): void {
    $('#image').click();
  }

  readURL(target: EventTarget & HTMLInputElement): void {
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
    const target: any = document.getElementById('image');

    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(target.files[0]);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.src = url;
          this.image = this.src;
        });
      }))
      .subscribe();
  }

  createEmployee(): void {
    this.adminService.findAccountById(this.employeeForm.get('account').value).subscribe(next => {
      this.account = next;
      this.employeeForm.patchValue({
        image: this.image,
        account: this.account
      });
      this.employeeService.create(this.employeeForm.value).subscribe(next => {
          $('#edit-em').click();
          this.employeeForm.reset();
          this.image = null;
          this.toastrService.success('Thêm mới nhân viên thành công');
        }
      );
    });
  }

  checkChose(): void {
    for (let i = 0; i < this.accountList.length; i++) {
      let flag = true;
      if ($('#' + this.accountList[i].accountId.toString()).is(':checked')) {
        for (let j = 0; j < this.deleteChose.length; j++) {
          if (this.deleteChose[j] === this.accountList[i].accountId) {
            flag = false;
            break;
          }
        }
        if (flag) {
          this.deleteChose.push(this.accountList[i].accountId);
        }
      } else {
        for (let z = 0; z < this.deleteChose.length; z++) {
          if (this.deleteChose[z] === this.accountList[i].accountId) {
            this.deleteChose.splice(z, 1);
          }
        }
      }
    }
  }

  tickForCheckBox(id: number): boolean {
    for (let i = 0; i < this.deleteChose.length; i++) {
      if (this.deleteChose[i] === id) {
        return true;
      }
    }
    return false;
  }

  deleteListAccount(): void {
    const reason = this.deleteListAccountForm.value.reason;
    for (let i = 0; i < this.deleteChose.length; i++) {
      this.adminService.findAccountById(this.deleteChose[i]).subscribe(
        next => {
          if (next.accountName !== this.accountName) {
            next.reason = reason;
            this.adminService.delete(next).subscribe(next2 => {
            }, error => {
              this.toastrService.error('', 'Xóa tài khoản ' + next.accountId + ' thất bại');
              this.ngOnInit();
              $('.destroyDelete').click();
            });
          } else {
            this.toastrService.error('', 'Xóa tài khoản ' + next.accountId + ' thất bại');
            $('.destroyDelete').click();
          }
        });
    }
    this.toastrService.success('Xóa tài khoản thành công');
    this.ngOnInit();
    $('.destroyDelete').click();
    this.deleteChose = [];
  }
}
