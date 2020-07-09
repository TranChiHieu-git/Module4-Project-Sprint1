import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {TestComponent} from './test/test.component';
import {RouterModule} from '@angular/router';
import {HomeRoutingModule} from './home-store/home-routing.module';
import {HomeStoreModule} from './home-store/home-store.module';


@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    HomeRoutingModule,
    HomeStoreModule
  ]
})
export class UserModule {
}
