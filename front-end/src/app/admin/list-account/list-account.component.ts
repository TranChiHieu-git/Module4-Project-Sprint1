import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AdminService} from '../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Account} from '../../models/account';
import {Employees} from '../../models/employees';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent implements OnInit {
  accountList: Account[];
  accountForm: FormGroup;
  userName: string;
  p = 1;
  infoAccountById: Employees = new Employees();
  AccountById: Account = new Account();
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
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.destroy').click(function() {
      $('#infor').hide();
    });
  }

  // tslint:disable-next-line:typedef
  edit() {
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
  delete() {
    $('#delete').show();
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.close').click(function() {
      $('#delete').hide();
    });
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.destroy').click(function() {
      $('#delete').hide();
    });
  }

  // tslint:disable-next-line:typedef
  create() {
    this.adminService.create(this.accountForm.value).subscribe(
      () => window.location.reload(),
      error => console.log(error)
    );
  }
}
