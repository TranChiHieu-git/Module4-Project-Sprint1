import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeRoutingModule} from "./employee-routing.module";
import {RouterModule} from "@angular/router";
import {PartnerManagementComponent} from "./partner-management/partner-management.component";
import {WarehouseManagementComponent} from "./warehouse-management/warehouse-management.component";

@NgModule({
  declarations: [PartnerManagementComponent, WarehouseManagementComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    RouterModule,
  ]
})
export class EmployeeModule {
}
