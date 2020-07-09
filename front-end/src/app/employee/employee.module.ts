import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeRoutingModule} from './employee-routing.module';
import {RouterModule} from '@angular/router';
import {PartnerManagementComponent} from './partner-management/partner-management.component';
import {WarehouseManagementComponent} from './warehouse-management/warehouse-management.component';
import { HomeComponent } from './warehouse-management/home/home.component';
import { ProductComponent } from './warehouse-management/product/product.component';
import {MaterialModule} from '../shares/material.module';
import { EmployeeDetailComponent } from './employee-manager/employee-detail/employee-detail.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ShareModule} from '../shares/share.module';
import { EmployeeManagerComponent } from './employee-manager/employee-manager.component';
import { ListDistributorComponent } from './partner-management/list-distributor/list-distributor.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [PartnerManagementComponent, EmployeeDetailComponent, EmployeeManagerComponent,
  WarehouseManagementComponent, HomeComponent, ProductComponent, ListDistributorComponent],
  exports: [
    WarehouseManagementComponent,
    PartnerManagementComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    RouterModule,
    MaterialModule,
    MatDialogModule,
    ShareModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class EmployeeModule {
}
