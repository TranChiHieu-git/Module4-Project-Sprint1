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
import {UserOdersComponent} from './user-oders/user-oders.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {UserOderDetailComponent} from './user-oder-detail/user-oder-detail.component';
import {MatIconModule} from '@angular/material/icon';
import {HomeStoreComponent} from './home-store/home-store.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {RegisterSuccessComponent} from './register-success/register-success.component';
import {AppModule} from '../app.module';
import {SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';

@NgModule({
  declarations: [TestComponent, UserManageComponent, OrderButtonComponent,
    UserRegisterComponent, UserLoginComponent, UserForgetpasswordComponent, UserManageComponent,
    UserOdersComponent, UserDetailComponent, UserOderDetailComponent, VerifyEmailComponent, VerifyEmailComponent, RegisterSuccessComponent],

  exports: [
    OrderButtonComponent,
    UserRegisterComponent,
    UserLoginComponent,
    UserForgetpasswordComponent,
    UserDetailComponent,
    UserOderDetailComponent,
    VerifyEmailComponent
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
    SocialLoginModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '399031736182-762109h8rkefbrb027lk7plmbru2unpk.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('946169665899071'),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
})
export class UserModule {
}
