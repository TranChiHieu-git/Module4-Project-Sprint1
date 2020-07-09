import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeRoutingModule} from './employee-routing.module';
import {RouterModule} from '@angular/router';
import {PartnerManagementComponent} from './partner-management/partner-management.component';
import {WarehouseManagementComponent} from './warehouse-management/warehouse-management.component';
import { HomeComponent } from './warehouse-management/home/home.component';

@NgModule({
    declarations: [PartnerManagementComponent, WarehouseManagementComponent, HomeComponent],
  exports: [
    WarehouseManagementComponent,
    PartnerManagementComponent
  ],
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        RouterModule,
    ]
})
export class EmployeeModule {
}
