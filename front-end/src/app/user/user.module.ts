import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {TestComponent} from './test/test.component';
import {RouterModule} from '@angular/router';
import {HomeRoutingModule} from './home-store/home-routing.module';
import {HomeStoreModule} from './home-store/home-store.module';
import { UserManageComponent } from './user-manage/user-manage.component';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [TestComponent, UserManageComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    HomeRoutingModule,
    HomeStoreModule,
    MatListModule
  ]
})
export class UserModule {
}
