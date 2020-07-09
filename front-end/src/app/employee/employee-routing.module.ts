import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeComponent} from './employee.component';
import {PartnerManagementComponent} from './partner-management/partner-management.component';
import {WarehouseManagementComponent} from './warehouse-management/warehouse-management.component';
import {TestPartnerComponent} from './partner-management/test-partner/test-partner.component';
import {HomeComponent} from './warehouse-management/home/home.component';
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
        {path: 'home', component: HomeComponent},
        {path: 'product', component: ProductComponent}
      ]
    }
  ]
}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class EmployeeRoutingModule {
}
