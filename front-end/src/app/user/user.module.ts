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
import {UserManageComponent} from './user-manage/user-manage.component';
import {MatListModule} from '@angular/material/list';
import {UserOdersComponent} from './user-oders/user-oders.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {UserOderDetailComponent} from './user-oder-detail/user-oder-detail.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [TestComponent, UserManageComponent, OrderButtonComponent,
    UserRegisterComponent, UserLoginComponent, UserForgetpasswordComponent, UserManageComponent,
    UserOdersComponent, UserDetailComponent, UserOderDetailComponent],
  exports: [
    OrderButtonComponent,
    UserRegisterComponent,
    UserLoginComponent,
    UserForgetpasswordComponent,
    UserDetailComponent,
    UserOderDetailComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    HomeRoutingModule,
    HomeStoreModule,
    ShareModule,
    MaterialModule,
    MatIconModule,
  ]
})
export class UserModule {
}
