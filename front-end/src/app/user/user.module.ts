import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
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
import {UserOdersComponent} from './user-oders/user-oders.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {UserOderDetailComponent} from './user-oder-detail/user-oder-detail.component';
import {OrderFolowComponent} from './order-folow/order-folow.component';
import {HomeStoreComponent} from './home-store/home-store.component';
import localeGB from '@angular/common/locales/vi';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
registerLocaleData(localeGB);
@NgModule({
  declarations: [TestComponent, UserManageComponent, OrderButtonComponent,
    UserRegisterComponent, UserLoginComponent, UserForgetpasswordComponent, UserManageComponent,
    UserOdersComponent, UserDetailComponent, UserOderDetailComponent, OrderFolowComponent,
    OrderFolowComponent,
    ShoppingCardComponent],
  exports: [
    OrderButtonComponent,
    UserRegisterComponent,
    UserLoginComponent,
    UserForgetpasswordComponent,
    UserDetailComponent,
    UserOderDetailComponent,
    HomeStoreComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    HomeRoutingModule,
    HomeStoreModule,
    ShareModule,
    MaterialModule,
  ], providers: [
    {provide: LOCALE_ID, useValue: 'vi'}

  ]
})
export class UserModule {
}
