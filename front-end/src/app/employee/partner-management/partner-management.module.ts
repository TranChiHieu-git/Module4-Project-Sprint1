import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestComponent} from './test/test.component';
import {PartnerManagementRoutingModule} from "./partner-management-routing.module";


@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    PartnerManagementRoutingModule
  ]
})
export class PartnerManagementModule {
}
