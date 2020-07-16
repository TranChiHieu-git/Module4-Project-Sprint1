import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Account} from '../../models/account';
import {Employees} from '../../models/employees';
import {Role} from '../../models/role';
import {Md5} from 'ts-md5';


@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent implements OnInit {
  accountList: Account[];
  roleList: Role[];
  accountForm: FormGroup;
  editAccountForm: FormGroup;
  p = 1;
  infoAccountById: Employees = new Employees();
  AccountById: Account = new Account();
  editResuilt: Account;
  size = 5;
  pageClicked = 0;
  pages = [];
  search = '';
  totalPages = 1;
  promiseAccount: any;

  constructor(private adminService: AdminService,
              private route: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.adminService.findAllRole().subscribe(next => {
      this.roleList = next;
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
      accountName: [''],
      accountPassword: [''],
      deleteFlag: [''],
      role: [''],
    });
    this.editAccountForm = this.formBuilder.group({
      accountId: ['', [Validators.required]],
      accountName: ['', [Validators.required]],
      accountPassword: ['', [Validators.required]],
      deleteFlag: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  getAll(): void {
    this.getAllSubmit(0);
  };

  getAllSubmit(page) {
    const md5 = new Md5();
    this.adminService.getAllCourse(page, this.size, this.search).subscribe(
      data => {
        this.pageClicked = page;
        this.accountList = data.content;
        for (let i = 0; i < this.accountList.length; i++) {
          this.accountList[i].accountPassword = md5.appendAsciiStr(<string> this.accountList[i].accountPassword).end();
        }
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }, error => console.log(error)
    );
  }

  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.getAllSubmit(this.pageClicked);
    }
  }

  onNext() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.getAllSubmit(this.pageClicked);
    }
  }

  onFirst() {
    this.pageClicked = 0;
    this.getAllSubmit(this.pageClicked);
  }

  onLast() {
    this.pageClicked = this.totalPages - 1;
    this.getAllSubmit(this.pageClicked);
  }

  // tslint:disable-next-line:typedef
  info(id) {
    this.adminService.findByInfoId(id).subscribe(next => {
      this.infoAccountById = next;
    }, error => {
      console.log(error);
    });
    this.adminService.findAccountById(id).subscribe(next => {
      this.AccountById = next;
    }, error => {
      console.log(error);
    });

    $('#infor').show();
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.close').click(function() {
      $('#infor').hide();
    });
  }

  // tslint:disable-next-line:typedef
  edit(id) {
    this.adminService.findByInfoId(id).subscribe(next => {
      this.infoAccountById = next;
    }, error => {
      console.log(error);
    });
    this.adminService.findAllRole().subscribe(next => {
      this.roleList = next;
    }, error => {
      console.log(error);
    });
    this.adminService.findAccountById(id).subscribe(next => {
      this.editAccountForm.patchValue({
        accountId: next.accountId,
        accountName: next.accountName,
        accountPassword: next.accountPassword,
        deleteFlag: next.deleteFlag,
        role: next.role.roleId
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
    this.adminService.findRoleById(this.accountForm.get('role').value).subscribe(
      next => {
        // this.accountForm.patchValue({
        //   role: next,
        //   deleteFlag: 0,
        // });
        this.promiseAccount = new Promise(resolve => resolve(next));
        this.promiseAccount.then((value) => {
          this.accountForm.value.role = value;
          this.adminService.create(this.accountForm.value).subscribe(
            () => {
              this.getAll();
              $('#close').click();
            },
            error => console.log(error)
          );
        });
      }
    );


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
    this.editResuilt.accountName = this.editAccountForm.value.accountName;
    this.editResuilt.accountPassword = this.editAccountForm.value.accountPassword;
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
