import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {TestComponent} from './test/test.component';
import { OrderButtonComponent } from './orderButton/orderButton.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ShareModule} from '../shares/share.module';
import {MaterialModule} from '../shares/material.module';
import { UserForgetpasswordComponent } from './user-forgetpassword/user-forgetpassword.component';


@NgModule({
  declarations: [TestComponent, OrderButtonComponent, UserRegisterComponent, UserLoginComponent, UserForgetpasswordComponent],
  exports: [
    OrderButtonComponent,
    UserRegisterComponent,
    UserLoginComponent,
    UserForgetpasswordComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ShareModule,
    MaterialModule,
  ]
})
export class UserModule {
}
