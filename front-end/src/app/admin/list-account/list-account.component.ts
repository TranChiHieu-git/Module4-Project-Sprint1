import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Account} from '../../models/account';
import {Employees} from '../../models/employees';
import {Role} from '../../models/role';

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

  constructor(private adminService: AdminService,
              private route: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.adminService.findAll().subscribe(
      next => this.accountList = next,
      error => console.log(error)
    );
    this.accountForm = this.formBuilder.group({
      id: [''],
      user_name: [''],
      password: ['']
    });
    this.editAccountForm = this.formBuilder.group({
      accountId: ['', [Validators.required]],
      accountName: ['', [Validators.required]],
      accountPassword: ['', [Validators.required]],
      deleteFlag: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
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
    this.adminService.findByInfoId(id).subscribe(next2 => {
      this.infoAccountById = next2;
    }, error => {
      console.log(error);
    });
    this.adminService.findAllRole().subscribe(next3 => {
      this.roleList = next3;
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
    this.adminService.create(this.accountForm.value).subscribe(
      () => window.location.reload(),
      error => console.log(error)
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
