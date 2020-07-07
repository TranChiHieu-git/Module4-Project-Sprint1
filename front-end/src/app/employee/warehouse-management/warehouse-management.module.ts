import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestComponent} from './test/test.component';
import {WarehouseManagementRoutingModule} from "./warehouse-management-routing.module";


@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    WarehouseManagementRoutingModule
  ]
})
export class WarehouseManagementModule {
}
