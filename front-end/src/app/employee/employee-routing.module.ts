import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EmployeeComponent} from "./employee.component";
import {PartnerManagementComponent} from "./partner-management/partner-management.component";
import {WarehouseManagementComponent} from "./warehouse-management/warehouse-management.component";
import {TestPartnerComponent} from "./partner-management/test-partner/test-partner.component";
import {TestWarehouseComponent} from "./warehouse-management/test-warehouse/test-warehouse.component";
import {ProductComponent} from './warehouse-management/product/product.component';

const routes: Routes = [{
  path: 'employee', component: EmployeeComponent,
  children: [
    {
      path: 'partner-management', component: PartnerManagementComponent, children: [
        {path: 'test', component: TestPartnerComponent}
      ]
    },
    {
      path: 'warehouse-management', component: WarehouseManagementComponent, children: [
        {path: 'test', component: TestWarehouseComponent}
      ]
    },
    {
      path: 'warehouse-management', component: WarehouseManagementComponent, children: [
        {path: 'product', component: ProductComponent}
      ]
    }
  ]
}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class EmployeeRoutingModule {
}
