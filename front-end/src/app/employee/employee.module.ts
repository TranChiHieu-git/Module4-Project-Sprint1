import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeRoutingModule} from './employee-routing.module';
import {RouterModule} from '@angular/router';
import {PartnerManagementComponent} from './partner-management/partner-management.component';
import {WarehouseManagementComponent} from './warehouse-management/warehouse-management.component';
import { HomeComponent } from './warehouse-management/home/home.component';
import {BillComponent} from './warehouse-management/bill/bill.component';
import {ListBillComponent} from './warehouse-management/bill/list-bill/list-bill.component';
import {SearchBillComponent} from './warehouse-management/bill/search-bill/search-bill.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './warehouse-management/product/product.component';
import {MaterialModule} from '../shares/material.module';
import { EmployeeDetailComponent } from './employee-manager/employee-detail/employee-detail.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ShareModule} from '../shares/share.module';
import { EmployeeManagerComponent } from './employee-manager/employee-manager.component';
import { ListDistributorComponent } from './partner-management/list-distributor/list-distributor.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {CustomerManagementComponent} from './partner-management/customer-management/customer-management.component';
import {BrandManagementComponent} from './warehouse-management/brand-management/brand-management.component';
import {CustomPaginationComponent} from './warehouse-management/product/custom-pagination/custom-pagination.component';

@NgModule({
  declarations: [PartnerManagementComponent, EmployeeDetailComponent, EmployeeManagerComponent,
    WarehouseManagementComponent, HomeComponent, ProductComponent, ListDistributorComponent, BillComponent,
    ListBillComponent, BrandManagementComponent,
    SearchBillComponent, CustomerManagementComponent, CustomPaginationComponent],
  exports: [
    WarehouseManagementComponent,
    PartnerManagementComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    HttpClientModule,
    NgbModule,
    MaterialModule,
    MatDialogModule,
    ShareModule,
    MatCardModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ]
})
export class EmployeeModule {
}
