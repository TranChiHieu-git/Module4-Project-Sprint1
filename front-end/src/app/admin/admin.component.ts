import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
<<<<<<< HEAD
import {TokenStorageService} from '../auth/token-storage.service';
import {AccountService} from '../services/account.service';
=======
>>>>>>> 61727b26342a79732cd03931f5ff5c9fcaa7a7f3

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
<<<<<<< HEAD
=======

  // tslint:disable-next-line:typedef
>>>>>>> 61727b26342a79732cd03931f5ff5c9fcaa7a7f3
  search() {
    if (window.location.href === 'http://localhost:4200/admin/access-times') {
      this.route.navigate(['/admin/access-times', this.userName]);
    } else {
      this.route.navigate(['/admin/list-account', this.userName]);
    }
  }
}
