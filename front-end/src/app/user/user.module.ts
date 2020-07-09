import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from "./user-routing.module";
import {TestComponent} from './test/test.component';


@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule {
}
