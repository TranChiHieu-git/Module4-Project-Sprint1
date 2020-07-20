import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../auth/token-storage.service';
import {AccountService} from '../services/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userName: string;

  constructor(private route: Router,
              private tokenStorageService: TokenStorageService,
              ) {
  }

  ngOnInit(): void {
    this.userName = this.tokenStorageService.getUsername();
  }
  search() {
    if (window.location.href === 'http://localhost:4200/admin/access-times') {
      this.route.navigate(['/admin/access-times', this.userName]);
    } else {
      this.route.navigate(['/admin/list-account', this.userName]);
    }
  }
}
