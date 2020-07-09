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
import {ReactiveFormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PartnerManagementComponent,
    WarehouseManagementComponent,
    HomeComponent,
    BillComponent,
    ListBillComponent,
    SearchBillComponent
  ],
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
    NgbModule
  ]
})
export class EmployeeModule {
}
