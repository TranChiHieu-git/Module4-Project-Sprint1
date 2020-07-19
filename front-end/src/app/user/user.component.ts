import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {AccountService} from '../services/account.service';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userDisplayName = '';

  constructor(private accountService: AccountService,
              private tokenStorage: TokenStorageService,
  ) {
  }


  ngOnInit(): void {
    this.userDisplayName = sessionStorage.getItem('loggedUser');
    console.log(this.userDisplayName);
  }

  signOut() {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
