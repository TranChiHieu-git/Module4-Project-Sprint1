import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AdminService} from "../../services/admin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Account} from "../../models/account";

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent implements OnInit {
  accountList: Account[];
  accountForm: FormGroup;
  userName: string;

  constructor(private adminService: AdminService,
              private route: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.userName = param.get('userName');
    });
    if (this.userName === null) {
      this.adminService.findAll().subscribe(
        next => this.accountList = next,
        error => console.log(error)
      );
    } else {
      this.adminService.findByUser(this.userName).subscribe(
        next => this.accountList = next,
        error => console.log(error)
      )
    }
    this.accountForm = this.formBuilder.group({
      id: [''],
      user_name: [''],
      password: ['']
    });
  }

  // tslint:disable-next-line:typedef
  info() {
    $('#infor').show();
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.close').click(function () {
      $('#infor').hide();
    });
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.destroy').click(function () {
      $('#infor').hide();
    });
  }

  // tslint:disable-next-line:typedef
  edit() {
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
  delete() {
    $('#delete').show();
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.close').click(function () {
      $('#delete').hide();
    });
    // tslint:disable-next-line:only-arrow-functions typedef
    $('.destroy').click(function () {
      $('#delete').hide();
    });
  }

  create() {
    this.adminService.create(this.accountForm.value).subscribe(
      () => window.location.reload(),
      error => console.log(error)
    );
  }
}
