import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {AccountService} from '../services/account.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userDisplayName = '';

  constructor(private accountService: AccountService,
              private tokenStorage: TokenStorageService,
              private router: Router,
  ) {
  }
  // showLogout() {
  //   $('#myModalLogout').modal('show');
  // }

  ngOnInit(): void {
    this.userDisplayName = sessionStorage.getItem('loggedUser');
    console.log(this.userDisplayName);
  }

  // tslint:disable-next-line:typedef
  signOut() {
    this.tokenStorage.signOut();
    window.location.reload();
    this.router.navigateByUrl('');
  }
  // tslint:disable-next-line:typedef
  reload1(){
    this.router.navigateByUrl('/user-manage/user-detail');
  }
  // tslint:disable-next-line:typedef
  reload2(){
    this.router.navigateByUrl('/user-manage/user-oder/1');
  }
}
