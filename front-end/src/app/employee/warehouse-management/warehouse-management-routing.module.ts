import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TestComponent} from "../warehouse-management/test/test.component";

const routes: Routes = [{path: 'employee/warehouse-management/test', component: TestComponent}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class WarehouseManagementRoutingModule {
}
