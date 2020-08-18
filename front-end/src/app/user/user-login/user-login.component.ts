import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthLoginInfo} from '../../auth/login-info';
import {TokenStorageService} from '../../auth/token-storage.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthJwtService} from '../../auth/auth-jwt.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  userInfo: AuthLoginInfo;
  message = '';
  rememberMe = false;

  constructor(private auth: AuthJwtService, private fb: FormBuilder,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private cookieService: CookieService,
  ) {
    if (cookieService.get('rememberMe') !== undefined) {
      console.log('1', cookieService.get('rememberMe'));
      if (cookieService.get('rememberMe') === 'yes') {
        this.userInfo.accountName = this.cookieService.get('username');
        console.log(this.userInfo.accountName);
        this.userInfo.accountPassword = this.cookieService.get('password');
        this.rememberMe = true;
      }
    }
  }
  // tslint:disable-next-line:variable-name
  validation_messages = {
    username: [
      {type: 'required', message: 'Tên Đăng Nhập Không Được Để Trống'},
      {type: 'maxlength', message: 'Tên Đăng Nhập Không Dài Quá 50 Ký Tự'},
      {type: 'pattern', message: 'Tên đăng nhập không chứa khoảng trống'},
    ],
    password: [
      {type: 'required', message: 'Yêu Cầu Nhập Mật Khẩu'}
      ]
  };
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.compose([
        Validators.maxLength(50),
        Validators.required,
        Validators.pattern(/^\S+.*\S+$/)
      ])),
      password: ['', [Validators.required]],
      rememberMe : false
    });
    // this.login(this.loginForm);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    console.log('a');
    this.submitted = true;
    this.userInfo = new AuthLoginInfo(this.fusername.value, this.fpassword.value);
    console.log(this.userInfo);
    this.login(this.userInfo);
    console.log(this.userInfo.accountName);

    // if (this.frememberMe.value){
    //   localStorage.setItem('rememberMe', 'Yes');
    //   localStorage.setItem('accountName', this.userInfo.accountName);
    //   console.log('rememberMe', this.userInfo.accountName);
    //   localStorage.setItem('accountPassword', this.userInfo.accountPassword);
    // } else {
    //   localStorage.setItem('rememberMe', 'No');
    //   localStorage.setItem('accountName', '');
    //   localStorage.setItem('accountPassword', '');
    // }
  }

  // tslint:disable-next-line:typedef
  get fusername() {
    return this.loginForm.get('username');
  }

  // tslint:disable-next-line:typedef
  get fpassword() {
    return this.loginForm.get('password');
  }

  // tslint:disable-next-line:typedef
  public login(userInfo) {
    console.log(userInfo);
    this.auth.attemptAuth(userInfo).subscribe(
      data => {
        if (this.rememberMe) {
          this.cookieService.set('rememberMe', 'Yes');
          this.cookieService.set('accountName', this.userInfo.accountName);
          console.log('rememberMe', this.userInfo.accountName);
          this.cookieService.set('accountPassword', this.userInfo.accountPassword);
        } else {
          this.cookieService.set('rememberMe', 'No');
          this.cookieService.set('accountName', '');
          this.cookieService.set('accountPassword', '');
        }
        this.tokenStorage.saveAuthorities(data.authorities);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.accountName);

        sessionStorage.setItem('loggedUser', userInfo.accountName);
        console.log('dataName', this.tokenStorage.saveUsername(data.accountName));
        console.log('dataPassword', userInfo.accountPassword);
        console.log('data', data);
        $('.modal-backdrop').remove();
        $('#loginButton').attr('data-dismiss', 'modal');
        // $('#loginModal').modal('hide');
        // sessionStorage.setItem('idUser', data.id);
        // tslint:disable-next-line:triple-equals
        if (this.tokenStorage.getAuthorities().indexOf('ROLE_ADMIN') != -1) {
          // this.router.navigateByUrl("/")
          this.redirectTo('admin');
          // tslint:disable-next-line:triple-equals
        } else if (this.tokenStorage.getAuthorities().indexOf('ROLE_EMPLOYEE') != -1) {
          this.redirectTo('employee/employee');
          // tslint:disable-next-line:triple-equals
        } else if (this.tokenStorage.getAuthorities().indexOf('ROLE_WAREHOUSE') != -1) {
          this.redirectTo('employee/warehouse-management');
        }
        // tslint:disable-next-line:triple-equals
        else if (this.tokenStorage.getAuthorities().indexOf('ROLE_PARTNER') != -1) {
          this.redirectTo('employee/partner-management');
        }
        // tslint:disable-next-line:triple-equals
        else if (this.tokenStorage.getAuthorities().indexOf('ROLE_MEMBER') != -1) {
          // sessionStorage.setItem('loggedUser', userInfo.accountName);
          this.redirectTo('');
          // window.location.reload();
          // this.tokenStorage.getUsername();
        }
        console.log('data1', this.tokenStorage.getAuthorities());
        console.log('data', userInfo.accountName);

      },
      error => {
        console.log('Error ', error);
        this.message = 'Tên đăng nhập không tồn tại hoặc sai mật khẩu';
      }
    );
  }

  // tslint:disable-next-line:typedef
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

}
