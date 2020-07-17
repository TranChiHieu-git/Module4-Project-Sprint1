import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {TestComponent} from './test/test.component';
import {RouterModule} from '@angular/router';
import {HomeRoutingModule} from './home-store/home-routing.module';
import {HomeStoreModule} from './home-store/home-store.module';
import {ShareModule} from '../shares/share.module';
import {MaterialModule} from '../shares/material.module';
import {UserForgetpasswordComponent} from './user-forgetpassword/user-forgetpassword.component';
import {UserLoginComponent} from './user-login/user-login.component';
import {UserRegisterComponent} from './user-register/user-register.component';
import {OrderButtonComponent} from './orderButton/orderButton.component';
import { UserManageComponent } from './user-manage/user-manage.component';

@NgModule({
  declarations: [TestComponent,
    UserManageComponent,
    OrderButtonComponent,
    UserRegisterComponent,
    UserLoginComponent,
    UserForgetpasswordComponent],
  exports: [
    OrderButtonComponent,
    UserRegisterComponent,
    UserLoginComponent,
    UserForgetpasswordComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    HomeRoutingModule,
    HomeStoreModule,
    ShareModule,
    MaterialModule,
  ]
})
export class UserModule {
}
